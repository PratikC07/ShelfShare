// server/src/middlewares/isAuthenticated.ts
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors.js";
import { catchAsync } from "../utils/catchAsync.js";
import { config } from "../config/index.js";

// This will add a 'user' property to the Express Request object
export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const isAuthenticated = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Unauthorized: No token provided");
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as {
        userId: string;
      };
      req.user = { userId: decoded.userId };
      next();
    } catch (error) {
      throw new UnauthorizedError("Unauthorized: Invalid token");
    }
  }
);
