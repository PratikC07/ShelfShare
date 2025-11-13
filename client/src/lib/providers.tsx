"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";

import { AuthHandler } from "@/components/shared/AuthHandler";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "toast-base",
          duration: 3000,

          success: {
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            duration: 2000,
          },

          error: {
            icon: <XCircle className="h-5 w-5 text-red-500" />,
            duration: 4000,
          },

          loading: {
            icon: <Loader2 className="h-5 w-5 animate-spin text-primary" />,
          },
        }}
      />

      <AuthHandler />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
