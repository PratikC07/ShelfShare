// server/src/modules/auth/auth.types.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  referralCode: z.string().optional(), // The code they *used* to sign up (e.g., LINA123)
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const loginBodySchema = z.object({
  body: loginSchema,
});

export const registerBodySchema = z.object({
  body: registerSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
