// server/src/modules/library/library.controller.ts
import { type Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { type AuthRequest } from "../../middlewares/isAuthenticated.js";
import { getPurchasedProducts } from "./library.service.js";

export const getLibraryHandler = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const products = await getPurchasedProducts(userId);
    res.status(200).json({
      status: "success",
      data: products,
    });
  }
);
