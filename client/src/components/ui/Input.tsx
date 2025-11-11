import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, error, ...props }, ref) => {
    const hasError = !!error;
    const inputId = props.id || props.name;

    return (
      <div className="flex w-full flex-col">
        <label
          htmlFor={inputId}
          className="pb-2 text-sm font-medium text-slate-900 dark:text-slate-300"
        >
          {label}
        </label>

        {/* This is the new parent wrapper.
          It handles all border, background, and focus-within states.
        */}
        <div
          className={cn(
            "flex h-11 w-full flex-1 items-stretch rounded-lg border border-slate-300 bg-background-light transition-all duration-150",
            "focus-within:ring-2 focus-within:ring-primary/50",
            "dark:border-slate-700 dark:bg-slate-900/50",
            hasError
              ? "border-red-500 focus-within:ring-red-500/50 dark:border-red-700"
              : "focus-within:border-primary/50" // Optional: change border color on focus
          )}
        >
          <input
            type={type}
            id={inputId}
            className={cn(
              "form-input w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent p-3 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-400",
              "border-0 focus:outline-none focus:ring-0", // Input is now borderless
              icon ? "rounded-l-lg" : "rounded-lg", // Handle rounding inside
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:text-white dark:placeholder-slate-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <div
              className={cn(
                "flex items-center justify-center rounded-r-lg px-3 text-slate-400 dark:text-slate-500"
              )}
            >
              {icon}
            </div>
          )}
        </div>

        {error && (
          <p className="pt-1 text-xs font-normal leading-normal text-red-600 dark:text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
