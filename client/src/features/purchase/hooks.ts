"use client";

// Import useQuery
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
// Import new api function
import { purchaseProduct, getMyPurchases } from "./api";
import {
  type PurchaseRequest,
  type PurchaseResponse,
  type PurchasedProduct,
} from "./types";

/**
 * Hook for handling a product purchase.
 * Encapsulates all API logic, state, and side effects.
 */
export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PurchaseResponse,
    AxiosError<{ message: string; error?: string }>,
    PurchaseRequest
  >({
    mutationFn: purchaseProduct,
    onSuccess: (data) => {
      toast.success(data.message);
      // Invalidate user data that is now stale
      queryClient.invalidateQueries({ queryKey: ["myPurchases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
    onError: (error) => {
      let errorMessage = "Purchase failed. Please try again.";
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = "You already own this product.";
        } else if (error.response.status === 401) {
          errorMessage = "You must be logged in to purchase.";
        }
      }
      toast.error(errorMessage);
    },
  });
};

/**
 * Hook for fetching the user's library of purchased products.
 */
export const useGetMyPurchases = () => {
  return useQuery<PurchasedProduct[], AxiosError>({
    queryKey: ["myPurchases"],
    queryFn: getMyPurchases,
    staleTime: 1000 * 60 * 5, // 5 minutes
    // We only want to run this query if the user is authenticated
    // The apiClient interceptor will handle 401s, but this
    // hook might be used by a logged-out user.
    // We'll let it run and handle the 'isOwned' logic in the component.
  });
};
