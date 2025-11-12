"use client";

import { type PurchasedProduct } from "@/features/purchase/types";
import { MotionDiv } from "@/components/ui/motion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";

interface PurchasedProductCardProps {
  product: PurchasedProduct;
  onView: () => void; // Function to open the detail modal
}

/**
 * A minimal, "book cover" style card for the user's library.
 * The entire card is clickable to open the modal.
 */
export function PurchasedProductCard({
  product,
  onView,
}: PurchasedProductCardProps) {
  return (
    <MotionDiv
      layout
      className={cn(
        "group flex cursor-pointer flex-col overflow-hidden rounded-xl",
        "transition-all duration-300 ease-in-out"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      whileHover={{ scale: 1.05 }}
      onClick={onView} // The whole card is clickable
    >
      {/* 1. Image with 3:4 aspect ratio */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
        <ImageWithFallback
          src={product.imageUrl}
          alt={`Cover image for ${product.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* 2. Centered, truncated title */}
      <div className="pt-3">
        <h3
          className={cn(
            "line-clamp-2 h-10 text-center text-sm font-semibold", // h-10 ensures 2 lines of space
            "text-slate-800 transition-colors group-hover:text-primary",
            "dark:text-slate-200 dark:group-hover:text-primary"
          )}
        >
          {product.name}
        </h3>
      </div>
    </MotionDiv>
  );
}
