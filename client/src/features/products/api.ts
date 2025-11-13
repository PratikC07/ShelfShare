import apiClient from "@/lib/apiClient";
import { type ProductSummary, type ProductDetail } from "./types";

export const getProducts = async (): Promise<ProductSummary[]> => {
  const response = await apiClient.get<{ data: ProductSummary[] }>("/products");
  return response.data.data;
};

export const getProductById = async (
  productId: string
): Promise<ProductDetail> => {
  const response = await apiClient.get<{ data: ProductDetail }>(
    `/products/${productId}`
  );
  return response.data.data;
};
