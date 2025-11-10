// server/src/modules/products/products.service.ts
import { redisClient } from "../../lib/redis.js";
import { ProductModel } from "../../models/product.model.js";
import { NotFoundError } from "../../utils/errors.js";

const ALL_PRODUCTS_CACHE_KEY = "products:all";
const PRODUCT_CACHE_KEY = (id: string) => `product:${id}`;
const CACHE_EXPIRATION_SECONDS = 3600; // 1 hour

export const getAllProducts = async () => {
  // 1. Check cache first
  const cachedProducts = await redisClient.get(ALL_PRODUCTS_CACHE_KEY);
  if (cachedProducts) {
    return JSON.parse(cachedProducts);
  }

  // 2. If not in cache, fetch from DB
  // We exclude description and downloadUrl from the list view for performance
  const products = await ProductModel.find().select(
    "-description -downloadUrl"
  );

  // 3. Save to cache and return
  await redisClient.setEx(
    ALL_PRODUCTS_CACHE_KEY,
    CACHE_EXPIRATION_SECONDS,
    JSON.stringify(products)
  );
  return products;
};

export const getProductById = async (id: string) => {
  // 1. Check cache first
  const cacheKey = PRODUCT_CACHE_KEY(id);
  const cachedProduct = await redisClient.get(cacheKey);
  if (cachedProduct) {
    return JSON.parse(cachedProduct);
  }

  // 2. If not in cache, fetch from DB
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  // 3. Save to cache and return
  await redisClient.setEx(
    cacheKey,
    CACHE_EXPIRATION_SECONDS,
    JSON.stringify(product)
  );
  return product;
};
