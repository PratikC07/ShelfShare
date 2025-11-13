"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useGetProducts } from "@/features/products/hooks";
import { ProductCard } from "@/components/features/products/ProductCard";
import { ProductCardSkeleton } from "@/components/features/products/ProductCardSkeleton";
import { AnimatePresence, MotionDiv, MotionH1 } from "@/components/ui/motion";
import { ProductDetailModal } from "@/components/features/products/ProductDetailModal";
import { Input } from "@/components/ui/Input";

export default function ProductsPage() {
  const { data: products, isLoading, isError, error } = useGetProducts();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="rounded-xl border border-red-500 bg-white p-6 text-center text-red-700 dark:bg-slate-800 dark:text-red-400">
          <h3 className="text-lg font-bold">Error Fetching Products</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      );
    }

    if (products && products.length > 0 && filteredProducts.length === 0) {
      return (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
          <h3 className="text-lg font-bold">No Products Found</h3>
          <p className="text-sm">
            Your search for &quot;{searchTerm}&quot; did not match any products.
          </p>
        </div>
      );
    }

    if (filteredProducts.length > 0) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={() => setSelectedProductId(product._id)}
            />
          ))}
        </div>
      );
    }

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
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <MotionDiv
          className="mb-8 flex flex-col items-center text-center"
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

        <div className="mb-8 flex w-full flex-col items-center">
          <div className="w-full max-w-md">
            <Input
              id="search"
              type="text"
              placeholder="Search by name..."
              icon={<Search className="h-5 w-5 text-slate-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {renderContent()}
      </main>

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
