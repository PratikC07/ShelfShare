"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react"; // Import icons

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* Updated Toaster configuration */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          // Add a base class for all toasts
          className: "toast-base",

          // Remove the invalid 'dark' key and base 'style'

          // Success toast styles
          success: {
            duration: 2000,
            icon: <CheckCircle className="text-primary" />,
            // Add a specific class for success toasts
            className: "toast-base toast-success",
          },

          // Error toast styles
          error: {
            duration: 4000,
            icon: <XCircle className="text-red-500" />,
            // Add a specific class for error toasts
            className: "toast-base toast-error",
          },
        }}
      />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
