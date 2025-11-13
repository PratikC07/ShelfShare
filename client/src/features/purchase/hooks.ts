"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { purchaseProduct, getMyPurchases } from "./api";
import { type PurchaseResponse, type PurchasedProduct } from "./types";
import { type ProductDetail } from "@/features/products/types";

export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PurchaseResponse,
    AxiosError<{ message: string; error?: string }>,
    { product: ProductDetail },
    { previousPurchases: PurchasedProduct[] }
  >({
    mutationFn: ({ product }) => purchaseProduct({ productId: product._id }),

    onMutate: async ({ product }) => {
      await queryClient.cancelQueries({ queryKey: ["myPurchases"] });

      const previousPurchases =
        queryClient.getQueryData<PurchasedProduct[]>(["myPurchases"]) || [];

      const newPurchasedProduct: PurchasedProduct = {
        _id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        downloadUrl: product.downloadUrl,
      };

      queryClient.setQueryData<PurchasedProduct[]>(["myPurchases"], (old) => [
        ...(old || []),
        newPurchasedProduct,
      ]);

      return { previousPurchases };
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error, variables, context) => {
      if (context?.previousPurchases) {
        queryClient.setQueryData(["myPurchases"], context.previousPurchases);
      }

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

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myPurchases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
};

export const useGetMyPurchases = () => {
  return useQuery<PurchasedProduct[], AxiosError>({
    queryKey: ["myPurchases"],
    queryFn: getMyPurchases,
    staleTime: 1000 * 60 * 5,
  });
};
