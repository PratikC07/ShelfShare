import apiClient from "@/lib/apiClient";
import { type ProductSummary, type ProductDetail } from "./types";

/**
 * Fetches the list of all products.
 * Corresponds to GET /api/products
 */
export const getProducts = async (): Promise<ProductSummary[]> => {
  const response = await apiClient.get<{ data: ProductSummary[] }>("/products");
  return response.data.data;
};

/**
 * Fetches the full details for a single product.
 * Corresponds to GET /api/products/:id
 */
export const getProductById = async (
  productId: string
): Promise<ProductDetail> => {
  const response = await apiClient.get<{ data: ProductDetail }>(
    `/products/${productId}`
  );
  return response.data.data;
};
