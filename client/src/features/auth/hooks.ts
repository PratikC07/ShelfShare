"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

import { useAuthStore } from "@/store/auth.store";
// Import both API functions
import { registerUser, loginUser } from "./api";
// Import both schema types
import { type RegisterSchema, type LoginSchema } from "./validation";
import { type AuthSuccessResponse } from "./types";

// --- EXISTING ---
export const useRegister = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const mutation = useMutation<
    AuthSuccessResponse,
    AxiosError<{ message: string; error?: string }>,
    RegisterSchema
  >({
    mutationFn: async (data) => {
      const payload = {
        ...data,
        referralCode: data.referralCode?.trim() || undefined,
      };
      return registerUser(payload);
    },
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      login(data.data);
      router.push("/products");
    },
    onError: (error) => {
      let errorMessage = "An unknown error occurred.";
      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "This email is already in use.";
        } else if (error.response.status === 404) {
          errorMessage = "Invalid referral code.";
        } else {
          errorMessage = error.response.data?.message || "Registration failed.";
        }
      }
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};

// --- NEW ---
export const useLogin = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const mutation = useMutation<
    AuthSuccessResponse,
    AxiosError<{ message: string; error?: string }>,
    LoginSchema
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      login(data.data);
      router.push("/products"); // Redirect to dashboard or home
    },
    onError: (error) => {
      // Per API docs, 401 is the main error
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("An unknown error occurred. Please try again.");
      }
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
