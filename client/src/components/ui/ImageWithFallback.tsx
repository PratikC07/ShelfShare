"use client";

import { useState } from "react"; // Removed useEffect
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react"; // A nice fallback icon
import { cn } from "@/lib/utils";

/**
 * A wrapper for `next/image` that gracefully handles
 * loading errors by displaying a fallback placeholder.
 */
export function ImageWithFallback(props: ImageProps) {
  const { src, alt, className, ...rest } = props;

  // --- FIX ---
  // Instead of a simple boolean, we store the `src` that failed.
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  // We derive the error state *during* rendering.
  // If the current `src` is the one that failed, we have an error.
  // If `src` changes to a new image, this will be false,
  // giving the new image a chance to load.
  const hasError = errorSrc === src;
  // --- END FIX ---

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600",
          className // Pass through consumer's layout classes
        )}
        // Pass through other props like 'fill' which might be on the parent
        {...rest}
      >
        <ImageOff className="h-12 w-12" />
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      src={src}
      className={className}
      onError={() => {
        // This fires if the image fails to load.
        // We save the `src` of the *specific* image that failed.
        setErrorSrc(src as string);
      }}
      {...rest}
    />
  );
}
