// server/src/lib/redis.ts
import { createClient } from "redis";
import { config } from "../config/index.js";

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Client Connected");
  } catch (error) {
    console.log("Redis Client Error", error);
    process.exit(1);
  }
};

// We also need to export a duplicate client for our Pub/Sub streaming
export const redisSubscriber = redisClient.duplicate();
export { redisClient };
