// server/src/api.ts
import { Router } from "express";
import authRouter from "./modules/auth/auth.route.js";
import productsRouter from "./modules/products/products.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);

export default router;
