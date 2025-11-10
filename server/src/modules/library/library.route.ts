// server/src/modules/library/library.route.ts
import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { getLibraryHandler } from "./library.controller.js";

const router = Router();

// This route must be authenticated
router.get("/", isAuthenticated, getLibraryHandler);

export default router;
