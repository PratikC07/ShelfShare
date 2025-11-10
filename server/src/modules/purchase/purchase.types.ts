// server/src/modules/purchase/purchase.types.ts
import { z } from "zod";

// Zod schema for validating the request body
export const purchaseBodySchema = z.object({
  body: z.object({
    productId: z.string().min(1, "Product ID is required"),
  }),
});

export type PurchaseBody = z.infer<typeof purchaseBodySchema>["body"];
