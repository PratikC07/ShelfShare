// server/src/modules/dashboard/dashboard.controller.ts
import { type Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { type AuthRequest } from "../../middlewares/isAuthenticated.js";
import {
  getDashboardStats,
  subscribeToDashboardUpdates,
  unsubscribeFromDashboardUpdates,
} from "./dashboard.service.js";

// Handler for our RESTful endpoint
export const getDashboardStatsHandler = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const stats = await getDashboardStats(userId);
    res.status(200).json({
      status: "success",
      data: stats,
    });
  }
);

// Handler for our SSE real-time stream
export const streamDashboardUpdatesHandler = (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user!.userId;

  // 1. Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  console.log(`[SSE] Connection OPENED for user: ${userId}`);

  // 2. Define the data handler
  const onData = (message: string) => {
    res.write(`data: ${message}\n\n`); // Send the event to the client
  };

  // 3. Define the cleanup function
  const onClose = () => {
    unsubscribeFromDashboardUpdates(userId);
    res.end();
    console.log(`[SSE] Connection CLOSED for user: ${userId}`);
  };

  // 4. Start the subscription
  subscribeToDashboardUpdates(userId, onData, onClose);

  // 5. Clean up when the client disconnects
  req.on("close", onClose);
};
