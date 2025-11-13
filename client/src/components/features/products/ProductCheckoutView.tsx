"use client";

import { ChevronLeft, Loader2 } from "lucide-react";
import { MotionDiv } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { type ProductDetail } from "@/features/products/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCheckoutViewProps {
  product: ProductDetail;
  onBack: () => void;
  onConfirm: () => void;
  isPurchasing: boolean;
}

export function ProductCheckoutView({
  product,
  onBack,
  onConfirm,
  isPurchasing,
}: ProductCheckoutViewProps) {
  return (
    <MotionDiv
      key="checkout"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col p-6 sm:p-8"
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-sm font-medium text-primary hover:underline"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back
      </button>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        Checkout
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        You are about to purchase:
      </p>

      <div className="my-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3
            className={cn(
              "font-semibold text-slate-900 dark:text-white",
              "line-clamp-3"
            )}
          >
            {product.name}
          </h3>

          <p className="text-slate-600 dark:text-slate-400">
            One-time purchase
          </p>
        </div>
        <div className="font-semibold text-slate-900 dark:text-white">
          {formatCurrency(product.price)}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={onConfirm}
        disabled={isPurchasing}
      >
        {isPurchasing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Confirm Purchase"
        )}
      </Button>
    </MotionDiv>
  );
}
