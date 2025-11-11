import apiClient from "@/lib/apiClient";
import { type AuthSuccessResponse } from "./types";
// Import both schema types
import { type RegisterSchema, type LoginSchema } from "./validation";

// --- EXISTING ---
export const registerUser = async (
  data: RegisterSchema
): Promise<AuthSuccessResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

// --- NEW ---
/**
 * Calls the POST /api/auth/login endpoint.
 * @param data - The user's email and password
 * @returns The auth success response with token and user
 */
export const loginUser = async (
  data: LoginSchema
): Promise<AuthSuccessResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
