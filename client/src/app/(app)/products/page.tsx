"use client";

import { useGetProducts } from "@/features/products/hooks";
import { ProductCard } from "@/components/features/products/ProductCard";
import { ProductCardSkeleton } from "@/components/features/products/ProductCardSkeleton";
import { AnimatePresence, MotionDiv, MotionH1 } from "@/components/ui/motion";
import { ProductDetailModal } from "@/components/features/products/ProductDetailModal";
import { useState } from "react";

export default function ProductsPage() {
  const { data: products, isLoading, isError, error } = useGetProducts();

  // 2. Add state to manage which product is selected
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const renderContent = () => {
    if (isLoading) {
      // Show a grid of skeletons while loading
      return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (isError) {
      // Show an error message if fetching fails
      return (
        <div className="rounded-xl border border-red-500 bg-white p-6 text-center text-red-700 dark:bg-slate-800 dark:text-red-400">
          <h3 className="text-lg font-bold">Error Fetching Products</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      );
    }

    if (products && products.length > 0) {
      return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            // 3. Pass the onClick handler to the card
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={() => setSelectedProductId(product._id)}
            />
          ))}
        </div>
      );
    }

    // Handle the case where there are no products
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
        <h3 className="text-lg font-bold">No Products Found</h3>
        <p className="text-sm">
          There are currently no products available in the store.
        </p>
      </div>
    );
  };

  return (
    // Use a <Fragment> to hold multiple root elements
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <MotionDiv
          className="mb-12 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MotionH1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl dark:text-white">
            Our Products
          </MotionH1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Browse our collection of premium e-books and templates.
          </p>
        </MotionDiv>

        {renderContent()}
      </main>

      {/* 4. Render the modal conditionally */}
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
