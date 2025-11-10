// server/src/modules/dashboard/dashboard.route.ts
import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import {
  getDashboardStatsHandler,
  streamDashboardUpdatesHandler,
} from "./dashboard.controller.js";

const router = Router();

// All routes in this module are protected
router.use(isAuthenticated);

router.get("/", getDashboardStatsHandler); // The REST endpoint
router.get("/stream", streamDashboardUpdatesHandler); // The SSE endpoint

export default router;
