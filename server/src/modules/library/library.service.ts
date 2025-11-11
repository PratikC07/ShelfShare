// server/src/modules/library/library.service.ts
import { redisClient } from "../../lib/redis.js";
import { UserModel } from "../../models/user.model.js";
import { NotFoundError } from "../../utils/errors.js";

const LIBRARY_CACHE_KEY = (userId: string) => `user:${userId}:purchases`;
const CACHE_EXPIRATION_SECONDS = 3600; // 1 hour

export const getPurchasedProducts = async (userId: string) => {
  let cachedLibrary: string | null = null;
  // 1. Check cache first
  try {
    cachedLibrary = await redisClient.get(LIBRARY_CACHE_KEY(userId));
  } catch (err) {
    console.error("Redis GET error (getPurchasedProducts):", err);
  }

  if (cachedLibrary) {
    try {
      return JSON.parse(cachedLibrary);
    } catch (err) {
      console.error("Redis JSON parse error:", err);
    }
  }

  // 2. If not in cache, fetch from DB
  const user = await UserModel.findById(userId)
    .select("purchasedProducts")
    .populate({
      path: "purchasedProducts",
      select: "name imageUrl downloadUrl",
    });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const products = user.purchasedProducts;

  // 3. Save to cache and return
  try {
    await redisClient.setEx(
      LIBRARY_CACHE_KEY(userId),
      CACHE_EXPIRATION_SECONDS,
      JSON.stringify(products)
    );
  } catch (err) {
    console.error("Redis SET error (getPurchasedProducts):", err);
  }

  return products;
};
