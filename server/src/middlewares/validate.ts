// server/src/middlewares/validate.ts
//
import type { NextFunction, Request, Response } from "express";
import { ZodError, type AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // This is the part from your guide
      // It parses the body, query, and params against the schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      // If validation fails, it passes the ZodError
      // to our global errorHandler.ts
      return next(error);
    }
  };
};
