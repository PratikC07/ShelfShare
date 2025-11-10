// server/src/modules/library/library.service.ts
import { redisClient } from "../../lib/redis.js";
import { UserModel } from "../../models/user.model.js";
import { NotFoundError } from "../../utils/errors.js";

const LIBRARY_CACHE_KEY = (userId: string) => `user:${userId}:purchases`;
const CACHE_EXPIRATION_SECONDS = 3600; // 1 hour

export const getPurchasedProducts = async (userId: string) => {
  // 1. Check cache first
  const cachedLibrary = await redisClient.get(LIBRARY_CACHE_KEY(userId));
  if (cachedLibrary) {
    return JSON.parse(cachedLibrary);
  }

  // 2. If not in cache, fetch from DB
  const user = await UserModel.findById(userId)
    .select("purchasedProducts")
    .populate({
      path: "purchasedProducts",
      select: "name imageUrl downloadUrl", // Only select the fields we need
    });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const products = user.purchasedProducts;

  // 3. Save to cache and return
  await redisClient.setEx(
    LIBRARY_CACHE_KEY(userId),
    CACHE_EXPIRATION_SECONDS,
    JSON.stringify(products)
  );

  return products;
};
