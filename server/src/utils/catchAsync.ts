// server/src/utils/catchAsync.ts
//
import type { NextFunction, Request, Response } from "express";

type AsyncController<T extends Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchAsync = <T extends Request>(fn: AsyncController<T>) => {
  return async (req: T, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
