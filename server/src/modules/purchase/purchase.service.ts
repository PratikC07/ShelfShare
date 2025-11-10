// server/src/modules/purchase/purchase.service.ts
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
  const pubSubPromises = []; // To hold our real-time update promises

  // 3. **Referral Logic (if it's their first purchase)**
  if (isFirstPurchase) {
    const referral = await ReferralModel.findOne({
      referred: userId,
      status: "pending",
    });

    if (referral) {
      // Found a pending referral!
      creditsAwarded = 2;
      referrerId = referral.referrer.toString();

      // --- 💡 ATOMIC DENORMALIZATION (The Fix) ---
      // We update all counters atomically. No re-calculating.
      await Promise.all([
        // a) Give 2 credits to the new user (Ryan)
        UserModel.updateOne({ _id: userId }, { $inc: { totalCredits: 2 } }),
        // b) Give 2 credits AND 1 conversion to the referrer (Lina)
        UserModel.updateOne(
          { _id: referrerId },
          { $inc: { totalCredits: 2, convertedUsersCount: 1 } }
        ),
        // c) Mark the referral as 'converted'
        ReferralModel.updateOne(
          { _id: referral._id },
          { $set: { status: "converted" } }
        ),
      ]);

      // --- 💡 REAL-TIME UPDATES FOR BOTH USERS ---

      // A) Build payload for Referrer (Lina)
      // We fetch the *new* denormalized stats. This is fast.
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
      // He only cares about his credits.
      const referredStats = await UserModel.findById(userId).select(
        "totalCredits"
      );
      const referredPayload = JSON.stringify({
        newCredits: referredStats?.totalCredits,
        newReferred: 0, // No change to his referral counts
        newConversions: 0, // No change to his referral counts
      });
      pubSubPromises.push(
        redisClient.publish(DASHBOARD_PUBSUB_CHANNEL(userId), referredPayload)
      );
    }
  }

  // 4. **Add Product to User's Library & Invalidate Cache**
  // We run these in parallel with our Pub/Sub publishes
  await Promise.all([
    UserModel.updateOne(
      { _id: userId },
      { $push: { purchasedProducts: product._id } }
    ),
    redisClient.del(LIBRARY_CACHE_KEY(userId)), // Invalidate library cache
    ...pubSubPromises, // Execute all Pub/Sub promises
  ]);

  // 5. Return success message
  if (creditsAwarded > 0) {
    return {
      message: `Purchase successful! You and your referrer earned ${creditsAwarded} credits.`,
      creditsAwarded,
    };
  }
  return { message: "Purchase successful!", creditsAwarded };
};
