import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProductById } from "./api";

/**
 * Custom hook to fetch the list of all products.
 * Manages fetching, caching, and server state.
 */
export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"], // The key for this query
    queryFn: getProducts,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Custom hook to fetch the details for a single product.
 * @param productId The ID of the product to fetch.
 */
export const useGetProductById = (productId: string | null) => {
  return useQuery({
    queryKey: ["product", productId], // A unique key for this specific product
    queryFn: () => getProductById(productId!), // The '!' is safe because of 'enabled'
    enabled: !!productId, // The query will only run if productId is not null
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
