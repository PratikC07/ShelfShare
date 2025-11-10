// server/src/modules/products/products.route.ts
import { Router } from "express";
import {
  getAllProductsHandler,
  getProductByIdHandler,
} from "./products.controller.js";
import { validate } from "../../middlewares/validate.js";
import { getProductParamsSchema } from "./products.types.js";

const router = Router();

router.get("/", getAllProductsHandler);
router.get("/:id", validate(getProductParamsSchema), getProductByIdHandler);

export default router;
