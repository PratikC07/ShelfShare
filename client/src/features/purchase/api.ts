import apiClient from "@/lib/apiClient";
import {
  type PurchaseRequest,
  type PurchaseResponse,
  type PurchasedProduct,
} from "./types";

export const purchaseProduct = async (
  data: PurchaseRequest
): Promise<PurchaseResponse> => {
  const response = await apiClient.post<{ data: PurchaseResponse }>(
    "/purchase",
    data
  );
  return response.data.data;
};

export const getMyPurchases = async (): Promise<PurchasedProduct[]> => {
  const response = await apiClient.get<{ data: PurchasedProduct[] }>(
    "/me/purchases"
  );
  return response.data.data;
};
