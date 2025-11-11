// server/src/modules/purchase/purchase.types.ts
import { Types } from "mongoose";
import { z } from "zod";

// Zod schema for validating the request body
export const purchaseBodySchema = z.object({
  body: z.object({
    productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Product ID format",
    }),
  }),
});

export type PurchaseBody = z.infer<typeof purchaseBodySchema>["body"];
