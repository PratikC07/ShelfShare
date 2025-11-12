"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { useGetMyPurchases } from "@/features/purchase/hooks";
import { PurchasedProductCard } from "@/components/features/library/PurchasedProductCard";
import { LibraryEmptyState } from "@/components/features/library/LibraryEmptyState";
import { ProductDetailModal } from "@/components/features/products/ProductDetailModal";
import { MotionDiv, MotionH1 } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * Skeleton loader for the new glassmorphic card
 */
function CardSkeleton() {
  return (
    <div
      className={cn("glass-card flex flex-col overflow-hidden rounded-xl p-4")}
    >
      <div className="w-full animate-pulse rounded-lg bg-slate-200/50 aspect-[3/4] dark:bg-slate-700/50"></div>
      <div className="pt-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200/50 dark:bg-slate-700/50"></div>
      </div>
      <div className="flex-grow"></div>
      <div className="pt-4">
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200/50 dark:bg-slate-700/50"></div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const { data: products, isLoading, isError, error } = useGetMyPurchases();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-500 bg-white p-12 text-center text-red-700 dark:bg-slate-800 dark:text-red-400">
          <AlertCircle className="h-12 w-12" />
          <h2 className="mt-6 text-xl font-bold">Error Loading Library</h2>
          <p className="mt-2 text-base">
            {error?.message || "Please try again later."}
          </p>
        </div>
      );
    }

    if (products && products.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <PurchasedProductCard
              key={product._id}
              product={product}
              onView={() => setSelectedProductId(product._id)}
            />
          ))}
        </div>
      );
    }

    return <LibraryEmptyState />;
  };

  return (
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <MotionDiv
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MotionH1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            My Library
          </MotionH1>
        </MotionDiv>

        {renderContent()}
      </main>

      {/* Modal remains the same */}
      <AnimatePresence>
        {selectedProductId && (
          <ProductDetailModal
            productId={selectedProductId}
            onClose={() => setSelectedProductId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
