// server/src/modules/products/products.types.ts
import { z } from "zod";

// Zod schema for validating the URL parameter
export const getProductParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Product ID is required"),
  }),
});

export type GetProductParams = z.infer<typeof getProductParamsSchema>["params"];
