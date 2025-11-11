// server/src/modules/products/products.service.ts
import { redisClient } from "../../lib/redis.js";
import { ProductModel } from "../../models/product.model.js";
import { NotFoundError } from "../../utils/errors.js";

const ALL_PRODUCTS_CACHE_KEY = "products:all";
const PRODUCT_CACHE_KEY = (id: string) => `product:${id}`;
const CACHE_EXPIRATION_SECONDS = 3600; // 1 hour

export const getAllProducts = async () => {
  // 1. Check cache first
  let cachedProducts: string | null = null;
  try {
    cachedProducts = await redisClient.get(ALL_PRODUCTS_CACHE_KEY);
  } catch (err) {
    console.error("Redis GET error (getAllProducts):", err);
  }

  if (cachedProducts) {
    try {
      return JSON.parse(cachedProducts);
    } catch (err) {
      console.error("Redis JSON parse error:", err);
    }
  }

  // 2. If not in cache, fetch from DB
  // We exclude description and downloadUrl from the list view for performance
  const products = await ProductModel.find().select(
    "-description -downloadUrl"
  );

  // 3. Save to cache and return
  try {
    await redisClient.setEx(
      ALL_PRODUCTS_CACHE_KEY,
      CACHE_EXPIRATION_SECONDS,
      JSON.stringify(products)
    );
  } catch (err) {
    console.error("Redis SET error (getAllProducts):", err);
  }
  return products;
};

export const getProductById = async (id: string) => {
  const cacheKey = PRODUCT_CACHE_KEY(id);
  let cachedProduct: string | null = null;

  // 1. Check cache first
  try {
    cachedProduct = await redisClient.get(cacheKey);
  } catch (err) {
    console.error("Redis GET error (getProductById):", err);
  }

  if (cachedProduct) {
    try {
      return JSON.parse(cachedProduct);
    } catch (err) {
      console.error("Redis JSON parse error:", err);
    }
  }

  // 2. If not in cache, fetch from DB
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  // 3. Save to cache and return
  try {
    await redisClient.setEx(
      cacheKey,
      CACHE_EXPIRATION_SECONDS,
      JSON.stringify(product)
    );
  } catch (err) {
    console.error("Redis SET error (getProductById):", err);
  }
  return product;
};
