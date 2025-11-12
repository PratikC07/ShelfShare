import apiClient from "@/lib/apiClient";
import {
  type PurchaseRequest,
  type PurchaseResponse,
  type PurchasedProduct, // Import new type
} from "./types";

/**
 * Calls the POST /api/purchase endpoint.
 * @param data - An object containing the productId
 */
export const purchaseProduct = async (
  data: PurchaseRequest
): Promise<PurchaseResponse> => {
  const response = await apiClient.post<{ data: PurchaseResponse }>(
    "/purchase",
    data
  );
  return response.data.data;
};

/**
 * Fetches the user's library of purchased products.
 * Corresponds to GET /me/purchases
 */
export const getMyPurchases = async (): Promise<PurchasedProduct[]> => {
  const response = await apiClient.get<{ data: PurchasedProduct[] }>(
    "/me/purchases"
  );
  return response.data.data;
};
