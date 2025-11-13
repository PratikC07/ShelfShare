"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getDashboardStats } from "./api";
import { useAuthStore } from "@/store/auth.store";
import { type DashboardStats, type DashboardStreamData } from "./types";

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5,
  });
};

let eventSource: EventSource | null = null;
let subscribers = 0;
let currentToken: string | null = null;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

function disconnectStream() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
  subscribers = 0;
  currentToken = null;
}

export const useDashboardStream = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token;

  useEffect(() => {
    if (!token) {
      if (eventSource) disconnectStream();
      return;
    }

    if (token !== currentToken && eventSource) {
      disconnectStream();
    }

    if (!eventSource) {
      try {
        const eventSourceUrl = `${API_URL}/me/dashboard/stream?token=${token}`;
        eventSource = new EventSource(eventSourceUrl);
        currentToken = token;

        eventSource.onmessage = (event) => {
          const data: DashboardStreamData = JSON.parse(event.data);

          queryClient.setQueryData(
            ["dashboardStats"],
            (oldData: DashboardStats | undefined) => {
              if (!oldData) return;
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
          disconnectStream();
        };
      } catch (err) {
        console.error("Failed to initialize EventSource:", err);
      }
    }

    subscribers++;

    return () => {
      subscribers--;
      if (subscribers === 0) {
        disconnectStream();
      }
    };
  }, [queryClient, token]);
};
