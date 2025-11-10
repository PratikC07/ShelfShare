// server/src/modules/purchase/purchase.controller.ts
import { type Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { type AuthRequest } from "../../middlewares/isAuthenticated.js";
import { type PurchaseBody } from "./purchase.types.js";
import { purchaseProduct } from "./purchase.service.js";

export const purchaseHandler = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const { productId } = req.body as PurchaseBody;

    const result = await purchaseProduct(productId, userId);

    res.status(200).json({
      status: "success",
      data: result,
    });
  }
);
