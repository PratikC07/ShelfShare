"use client";

import Link from "next/link";
import { Download, Loader2 } from "lucide-react";
import { MotionDiv } from "@/components/ui/motion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { CollapsibleText } from "@/components/ui/CollapsibleText";
import { Button } from "@/components/ui/Button";
import { type ProductDetail } from "@/features/products/types";
import { formatCurrency } from "@/lib/utils";
import { useFileDownloader } from "@/features/products/hooks";

interface ProductDetailViewProps {
  product: ProductDetail;
  isOwned: boolean;
  isLoggedIn: boolean;
  onGoToCheckout: () => void;
}

export function ProductDetailView({
  product,
  isOwned,
  isLoggedIn,
  onGoToCheckout,
}: ProductDetailViewProps) {
  const { isDownloading, triggerDownload } = useFileDownloader();

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
      <div className="flex flex-col gap-4 p-6 text-left sm:p-8">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-800 sm:text-3xl dark:text-white text-center">
          {product.name}
        </h2>

        <CollapsibleText text={product.description} lines={3} />

        {isOwned ? (
          product.downloadUrl ? (
            <Button
              variant="secondary"
              size="lg"
              className="mt-4 w-full"
              onClick={() => triggerDownload(product.downloadUrl, product.name)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Download className="mr-2 h-5 w-5" />
              )}
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              className="mt-4 w-full"
              disabled
            >
              <Download className="mr-2 h-5 w-5" />
              Download Unavailable
            </Button>
          )
        ) : !isLoggedIn ? (
          <Button asChild size="lg" className="mt-4 w-full">
            <Link href="/login">Log in to Buy</Link>
          </Button>
        ) : (
          <Button size="lg" className="mt-4 w-full" onClick={onGoToCheckout}>
            Buy Now for {formatCurrency(product.price)}
          </Button>
        )}
      </div>
    </MotionDiv>
  );
}
