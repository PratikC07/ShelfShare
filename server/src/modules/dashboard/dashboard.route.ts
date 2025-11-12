// server/src/modules/dashboard/dashboard.route.ts
import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import {
  getDashboardStatsHandler,
  streamDashboardUpdatesHandler,
} from "./dashboard.controller.js";
import { isAuthenticatedSSE } from "../../middlewares/isAuthenticatedSSE.js";

const router = Router();

router.get("/", isAuthenticated, getDashboardStatsHandler); // The REST endpoint
router.get("/stream", isAuthenticatedSSE, streamDashboardUpdatesHandler); // The SSE endpoint

export default router;
