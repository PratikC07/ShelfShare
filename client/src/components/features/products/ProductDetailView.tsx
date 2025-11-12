"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { MotionDiv } from "@/components/ui/motion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { CollapsibleText } from "@/components/ui/CollapsibleText";
import { Button } from "@/components/ui/Button";
import { type ProductDetail } from "@/features/products/types";
import { formatCurrency } from "@/lib/utils";

interface ProductDetailViewProps {
  product: ProductDetail;
  isOwned: boolean;
  isLoggedIn: boolean;
  onGoToCheckout: () => void;
}

/**
 * The "Details" view of the product modal.
 * This is a "dumb" component that just renders props.
 */
export function ProductDetailView({
  product,
  isOwned,
  isLoggedIn,
  onGoToCheckout,
}: ProductDetailViewProps) {
  // --- FIX ---
  // The logic for the "SmartButton" is moved directly into the
  // return statement below. We are no longer defining a new
  // component inside the render function.

  return (
    <MotionDiv
      key="details"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col"
    >
      <div className="relative w-full aspect-video">
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-800 dark:text-white">
          {product.name}
        </h2>
        <CollapsibleText text={product.description} />

        {/* --- FIXED LOGIC --- */}
        {/*
          By inlining the conditional logic, we avoid creating a
          new component (`<SmartButton />`) on every render.
        */}
        {isOwned ? (
          <Button asChild variant="secondary" size="lg" className="mt-4 w-full">
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Download className="mr-2 h-5 w-5" />
              Download
            </a>
          </Button>
        ) : !isLoggedIn ? (
          <Button asChild size="lg" className="mt-4 w-full">
            <Link href="/login">Log in to Buy</Link>
          </Button>
        ) : (
          <Button
            size="lg"
            className="mt-4 w-full"
            onClick={onGoToCheckout} // Go to checkout view
          >
            Buy Now for {formatCurrency(product.price)}
          </Button>
        )}
        {/* --- END FIX --- */}
      </div>
    </MotionDiv>
  );
}
