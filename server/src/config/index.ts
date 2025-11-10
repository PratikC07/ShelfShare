// server/src/config/index.ts
import dotenv from "dotenv";
dotenv.config();

// Helper to get and validate an env var
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  port: getEnv("PORT"),
  mongoUri: getEnv("MONGO_URI"),
  redisUrl: getEnv("REDIS_URL"),
  jwtSecret: getEnv("JWT_SECRET"),
  clientUrl: getEnv("CLIENT_URL"),
};
