// src/components/shared/AuthHandler.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { MotionDiv } from "@/components/ui/motion";

const publicAuthRoutes = ["/login", "/register", "/"];
const privateRoutes = ["/products", "/dashboard", "/library"];

function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center bg-background-light/80 backdrop-blur-sm dark:bg-background-dark/80">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Loader2 className="h-10 w-10 animate-spin text-slate-900 dark:text-slate-100" />
      </MotionDiv>
    </div>
  );
}

export function AuthHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const { token, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const isPublicAuthPage = publicAuthRoutes.includes(pathname);
    const isPrivatePage = privateRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!token && isPrivatePage) {
      router.replace("/login");
    }

    if (token && isPublicAuthPage) {
      router.replace("/products");
    }
  }, [token, isHydrated, pathname, router]);

  if (!isHydrated) {
    return <FullScreenLoader />;
  }

  const isPrivatePage = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (!token && isPrivatePage) {
    return <FullScreenLoader />;
  }

  const isPublicAuthPage = publicAuthRoutes.includes(pathname);
  if (token && isPublicAuthPage) {
    return <FullScreenLoader />;
  }

  return null;
}
