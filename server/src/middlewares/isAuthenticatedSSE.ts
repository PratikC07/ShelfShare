// server/src/middlewares/isAuthenticatedSSE.ts
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors.js";
import { catchAsync } from "../utils/catchAsync.js";
import { config } from "../config/index.js";

// Assume AuthRequest is imported or redefined here

// Re-using the same interface for consistency
export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const isAuthenticatedSSE = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Extract token from the query string
    const token = req.query.token as string | undefined;

    if (!token) {
      // Must use .send() or .end() for SSE connections, not .json()
      throw new UnauthorizedError("Unauthorized: Missing token in query.");
    }

    try {
      // 2. Verify the token using the same logic as isAuthenticated
      // NOTE: You'll need to import 'config' and 'jwtSecret' here.
      const decoded = jwt.verify(token, config.jwtSecret) as {
        userId: string;
      };

      // 3. Attach the user ID to the request object
      req.user = { userId: decoded.userId };

      // 4. Continue to the controller
      next();
    } catch (error) {
      throw new UnauthorizedError("Unauthorized: Invalid token");
    }
  }
);
