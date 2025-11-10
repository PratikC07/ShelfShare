// server/src/api.ts
import { Router } from "express";
import authRouter from "./modules/auth/auth.route.js";
import productsRouter from "./modules/products/products.route.js";
import purchaseRouter from "./modules/purchase/purchase.route.js";
import dashboardRouter from "./modules/dashboard/dashboard.route.js";
import libraryRouter from "./modules/library/library.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/purchase", purchaseRouter);

router.use("/me/dashboard", dashboardRouter);
router.use("/me/purchases", libraryRouter);

export default router;
