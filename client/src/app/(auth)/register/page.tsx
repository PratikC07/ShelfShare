"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MotionDiv } from "@/components/ui/motion";

// 1. Import our new, separated logic
import {
  registerSchema,
  type RegisterSchema,
} from "@/features/auth/validation";
import { useRegister } from "@/features/auth/hooks";

/**
 * The inner form component that uses our custom hook
 */
function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const referralCodeFromUrl = searchParams.get("referralCode");

  // 2. Call our custom hook to get mutation logic
  const { mutate, isPending } = useRegister();

  // 3. Set up the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // The referral code is set from the URL but is not a visible field
      referralCode: referralCodeFromUrl || "",
    },
  });

  // 4. The submit handler is now just one line
  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
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
          Sign Up
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Get started by creating your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch gap-4"
      >
        <Input
          label="Name"
          id="name"
          type="text"
          placeholder="Enter your full name"
          {...register("name")}
          error={errors.name?.message}
          disabled={isPending}
        />
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
          placeholder="Create a password"
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

        {/* The referral code input is gone, but the logic works! */}

        <div className="flex w-full flex-col items-center gap-4 pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            size="lg"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </Button>
          <p className="text-center text-sm font-normal text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </MotionDiv>
  );
}

/**
 * Main page component wraps the form in Suspense
 * for useSearchParams to work.
 */
export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
