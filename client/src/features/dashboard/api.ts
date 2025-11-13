import apiClient from "@/lib/apiClient";
import { type DashboardStats } from "./types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get<{ data: DashboardStats }>(
    "/me/dashboard"
  );
  return response.data.data;
};
