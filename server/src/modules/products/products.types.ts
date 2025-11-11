// server/src/modules/products/products.types.ts
import { Types } from "mongoose";
import { z } from "zod";

// Zod schema for validating the URL parameter
export const getProductParamsSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Product ID",
    }),
  }),
});

export type GetProductParams = z.infer<typeof getProductParamsSchema>["params"];
