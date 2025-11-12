"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MotionDiv } from "@/components/ui/motion";

// 1. Import our new, separated login logic
import { loginSchema, type LoginSchema } from "@/features/auth/validation";
import { useLogin } from "@/features/auth/hooks";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // 2. Call our custom hook
  const { mutate, isPending } = useLogin();

  // 3. Set up the form with the login schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 4. Submit handler calls the mutate function
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    mutate(data);
  };

  return (
    <MotionDiv
      className="flex w-full flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-2xl dark:border dark:border-slate-700 dark:bg-slate-900/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full flex-col items-center gap-2">
        <h2 className="text-center text-3xl font-bold leading-tight text-slate-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Log in to your account to continue.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch gap-4"
      >
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          error={errors.email?.message}
          disabled={isPending}
        />
        <Input
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          disabled={isPending}
          icon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
        />

        <div className="flex w-full flex-col items-center gap-4 pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            size="lg"
          >
            {isPending ? "Logging in..." : "Log In"}
          </Button>
          <p className="text-center text-sm font-normal text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </MotionDiv>
  );
}
