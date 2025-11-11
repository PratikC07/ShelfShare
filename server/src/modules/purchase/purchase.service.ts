// server/src/modules/purchase/purchase.service.ts
import mongoose from "mongoose"; // <-- Import mongoose for transactions
import { UserModel } from "../../models/user.model.js";
import { ProductModel } from "../../models/product.model.js";
import { ReferralModel } from "../../models/referral.model.js";
import { redisClient } from "../../lib/redis.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";

const LIBRARY_CACHE_KEY = (userId: string) => `user:${userId}:purchases`;
const DASHBOARD_PUBSUB_CHANNEL = (userId: string) =>
  `dashboard-updates:${userId}`;

export const purchaseProduct = async (productId: string, userId: string) => {
  // 1. Validate Product
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  // 2. Check if user already owns the product
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isFirstPurchase = user.purchasedProducts.length === 0;
  if (user.purchasedProducts.some((id) => id.equals(product._id))) {
    throw new BadRequestError("You already own this product");
  }

  let creditsAwarded = 0;
  let referrerId: string | null = null;
  const pubSubPromises = [];

  // 3. **Start MongoDB Transaction**
  // This ensures all database writes succeed or fail together.
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // 3. **Referral Logic (if it's their first purchase)**
      if (isFirstPurchase) {
        const referral = await ReferralModel.findOne({
          referred: userId,
          status: "pending",
        }).session(session); // <-- Pass session to the query

        if (referral) {
          creditsAwarded = 2;
          referrerId = referral.referrer.toString();

          // --- 💡 ATOMIC TRANSACTIONAL UPDATES ---
          // These 3 operations MUST complete together.

          // a) Give 2 credits to the new user (Ryan)
          await UserModel.updateOne(
            { _id: userId },
            { $inc: { totalCredits: 2 } },
            { session } // <-- Pass session
          );

          // b) Give 2 credits AND 1 conversion to the referrer (Lina)
          await UserModel.updateOne(
            { _id: referrerId },
            { $inc: { totalCredits: 2, convertedUsersCount: 1 } },
            { session } // <-- Pass session
          );

          // c) Mark the referral as 'converted'
          await ReferralModel.updateOne(
            { _id: referral._id },
            { $set: { status: "converted" } },
            { session } // <-- Pass session
          );
        }
      }

      // 4. **Add Product to User's Library (part of the transaction)**
      await UserModel.updateOne(
        { _id: userId },
        { $push: { purchasedProducts: product._id } },
        { session } // <-- Pass session
      );
    }); // <-- Transaction ends and commits here
  } catch (error) {
    // If anything in the transaction fails, it's rolled back.
    console.error("MongoDB Transaction Error in purchaseProduct:", error);
    throw new BadRequestError("Purchase failed, please try again.");
  } finally {
    // Always end the session
    await session.endSession();
  }

  // --- 5. Post-Transaction Logic (Cache Invalidation & Real-Time Updates) ---
  // We do this *after* the transaction is committed.

  // 5a. **Invalidate Cache (Resiliently)**
  // We wrap this in a try/catch so a Redis failure doesn't
  // break the purchase for the user.
  try {
    await redisClient.del(LIBRARY_CACHE_KEY(userId)); // Invalidate library cache
  } catch (redisErr) {
    console.error("Redis DEL error (purchaseProduct):", redisErr);
    // We "fail open" - the user's purchase was successful,
    // so we don't throw an error here.
  }

  // 5b. **Publish Real-Time Updates (if referral was applied)**
  if (referrerId && creditsAwarded > 0) {
    try {
      // A) Build payload for Referrer (Lina)
      // We fetch the *new* denormalized stats (safe, transaction is done).
      const referrerStats = await UserModel.findById(referrerId).select(
        "totalCredits referredUsersCount convertedUsersCount"
      );
      const referrerPayload = JSON.stringify({
        newCredits: referrerStats?.totalCredits,
        newReferred: referrerStats?.referredUsersCount,
        newConversions: referrerStats?.convertedUsersCount,
      });
      pubSubPromises.push(
        redisClient.publish(
          DASHBOARD_PUBSUB_CHANNEL(referrerId),
          referrerPayload
        )
      );

      // B) Build payload for Referred User (Ryan)
      const referredStats = await UserModel.findById(userId).select(
        "totalCredits"
      );
      const referredPayload = JSON.stringify({
        newCredits: referredStats?.totalCredits,
        newReferred: 0,
        newConversions: 0,
      });
      pubSubPromises.push(
        redisClient.publish(DASHBOARD_PUBSUB_CHANNEL(userId), referredPayload)
      );

      // Execute all Pub/Sub promises
      await Promise.all(pubSubPromises);
    } catch (pubSubErr) {
      console.error("Redis PUBLISH error (purchaseProduct):", pubSubErr);
      // We also "fail open" here.
    }
  }

  // 6. Return success message
  if (creditsAwarded > 0) {
    return {
      message: `Purchase successful! You and your referrer earned ${creditsAwarded} credits.`,
      creditsAwarded,
    };
  }
  return { message: "Purchase successful!", creditsAwarded };
};
