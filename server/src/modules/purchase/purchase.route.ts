// server/src/modules/purchase/purchase.route.ts
import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { purchaseBodySchema } from "./purchase.types.js";
import { purchaseHandler } from "./purchase.controller.js";

const router = Router();

// This route must be authenticated, and the body must be validated
router.post(
  "/",
  isAuthenticated,
  validate(purchaseBodySchema),
  purchaseHandler
);

export default router;
