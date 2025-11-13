import apiClient from "@/lib/apiClient";
import { type AuthSuccessResponse } from "./types";
import { type RegisterSchema, type LoginSchema } from "./validation";

export const registerUser = async (
  data: RegisterSchema
): Promise<AuthSuccessResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (
  data: LoginSchema
): Promise<AuthSuccessResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
