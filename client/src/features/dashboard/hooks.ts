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

// --- START REFACTOR: Singleton Stream Management ---

let eventSource: EventSource | null = null;
let subscribers = 0;
let currentToken: string | null = null;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Disconnects and cleans up the shared EventSource.
 */
function disconnectStream() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
  subscribers = 0;
  currentToken = null;
}

/**
 * Hook to connect to the real-time dashboard SSE stream.
 * This hook now manages a single shared connection
 * for all components that use it.
 */
export const useDashboardStream = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token;

  useEffect(() => {
    if (!token) {
      // If user is logged out, ensure any existing stream is disconnected
      if (eventSource) disconnectStream();
      return;
    }

    // If token has changed (e.g., re-login), force a new connection
    if (token !== currentToken && eventSource) {
      disconnectStream();
    }

    // If this is the first subscriber, create the connection
    if (!eventSource) {
      try {
        const eventSourceUrl = `${API_URL}/me/dashboard/stream?token=${token}`;
        eventSource = new EventSource(eventSourceUrl);
        currentToken = token;

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
          disconnectStream(); // Disconnect on error
        };
      } catch (err) {
        console.error("Failed to initialize EventSource:", err);
      }
    }

    // Add this hook instance as a subscriber
    subscribers++;

    // Cleanup function: called when the component unmounts
    return () => {
      subscribers--;
      // If this is the last subscriber, disconnect the stream
      if (subscribers === 0) {
        disconnectStream();
      }
    };
  }, [queryClient, token]);
};
// --- END REFACTOR ---
