// server/src/middlewares/rateLimiter.ts
import type { NextFunction } from "express";
import type { Request, Response } from "express";
import { redisClient } from "../lib/redis.js";
import { TooManyRequestsError } from "../utils/errors.js";

export const createRateLimiter = ({
  windowInSeconds,
  maxRequests,
}: {
  windowInSeconds: number;
  maxRequests: number;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const key = `rate-limit:${req.originalUrl}:${ip}`;

    try {
      const multi = redisClient.multi();
      multi.incr(key);
      multi.expire(key, windowInSeconds);

      const result = await multi.exec();

      if (!result || result.length === 0) {
        console.error("Redis transaction for rate limiting failed.");
        return next(); // Fail open
      }

      const currentRequests = result[0] as unknown as number;

      if (currentRequests > maxRequests) {
        throw new TooManyRequestsError(
          "Too many requests, please try again later."
        );
      }
      next();
    } catch (error) {
      console.error("Redis rate limiter error, failing open:", error);
      next();
    }
  };
};
