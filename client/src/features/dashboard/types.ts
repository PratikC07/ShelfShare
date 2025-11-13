export interface DashboardStats {
  totalCredits: number;
  referredUsersCount: number;
  convertedUsersCount: number;
  referralCode: string;
}

export interface DashboardStreamData {
  newCredits: number;
  newReferred: number;
  newConversions: number;
}
