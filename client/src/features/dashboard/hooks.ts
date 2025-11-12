"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getDashboardStats } from "./api";
import { useAuthStore } from "@/store/auth.store";
import { type DashboardStats, type DashboardStreamData } from "./types";

/**
 * Hook to fetch the initial dashboard stats.
 */
export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to connect to the real-time dashboard SSE stream.
 * This hook will listen for updates and push them
 * directly into the react-query cache.
 */
export const useDashboardStream = () => {
  const queryClient = useQueryClient();
  // We need the token to authenticate the EventSource connection
  const token = useAuthStore.getState().token;

  useEffect(() => {
    if (!token) return; // Don't connect if not logged in

    // We must pass the token as a query param
    // (EventSource doesn't support Authorization headers)
    const eventSourceUrl = `${process.env.NEXT_PUBLIC_API_URL}/me/dashboard/stream?token=${token}`;

    let eventSource: EventSource;

    try {
      eventSource = new EventSource(eventSourceUrl);

      eventSource.onmessage = (event) => {
        const data: DashboardStreamData = JSON.parse(event.data);

        // When we get a message, update the react-query cache instantly
        queryClient.setQueryData(
          ["dashboardStats"],
          (oldData: DashboardStats | undefined) => {
            if (!oldData) return;
            // Return new state based on the stream data
            return {
              ...oldData,
              totalCredits: data.newCredits,
              referredUsersCount: data.newReferred,
              convertedUsersCount: data.newConversions,
            };
          }
        );
      };

      eventSource.onerror = (err) => {
        console.error("Dashboard EventSource failed:", err);
        eventSource.close();
      };
    } catch (err) {
      console.error("Failed to initialize EventSource:", err);
    }

    // Cleanup on unmount
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [queryClient, token]);
};
