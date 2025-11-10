// server/src/modules/dashboard/dashboard.service.ts
import { UserModel } from "../../models/user.model.js";
import { NotFoundError } from "../../utils/errors.js";
import { redisSubscriber } from "../../lib/redis.js";

const DASHBOARD_PUBSUB_CHANNEL = (userId: string) =>
  `dashboard-updates:${userId}`;

/**
 * Gets the current dashboard stats for a user.
 * This is a simple, fast query thanks to our denormalization.
 */
export const getDashboardStats = async (userId: string) => {
  const user = await UserModel.findById(userId).select(
    "totalCredits referredUsersCount convertedUsersCount referralCode"
  );

  if (!user) {
    throw new NotFoundError("User not found");
  }

  // We return the raw data. Our API contract says the frontend builds the link.
  return {
    totalCredits: user.totalCredits,
    referredUsersCount: user.referredUsersCount,
    convertedUsersCount: user.convertedUsersCount,
    referralCode: user.referralCode,
  };
};

/**
 * Handles the real-time SSE subscription for a user.
 * This is based on the "Who's In" SSE controller
 */
export const subscribeToDashboardUpdates = async (
  userId: string,
  onData: (data: string) => void,
  onClose: () => void
) => {
  const channel = DASHBOARD_PUBSUB_CHANNEL(userId);

  try {
    // Subscribe to the user-specific channel
    await redisSubscriber.subscribe(channel, (message) => {
      onData(message); // Pass the message to the controller to write to the SSE stream
    });

    // The onClose function will be called when the client disconnects
    return onClose;
  } catch (err) {
    console.error(`Error subscribing to Redis channel ${channel}:`, err);
    onClose(); // Ensure we clean up
  }
};

/**
 * Unsubscribes from the dashboard updates channel.
 */
export const unsubscribeFromDashboardUpdates = (userId: string) => {
  const channel = DASHBOARD_PUBSUB_CHANNEL(userId);
  redisSubscriber.unsubscribe(channel);
};
