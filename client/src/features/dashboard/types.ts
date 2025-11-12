/**
 * Represents the data shape from the
 * GET /me/dashboard API endpoint.
 */
export interface DashboardStats {
  totalCredits: number;
  referredUsersCount: number;
  convertedUsersCount: number;
  referralCode: string;
}

/**
 * Represents the data shape from the
 * GET /me/dashboard/stream SSE event.
 */
export interface DashboardStreamData {
  newCredits: number;
  newReferred: number;
  newConversions: number;
}
