"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageWithFallback(props: ImageProps) {
  const { src, alt, className, fill, ...rest } = props;

  const [finishedLoadingSrc, setFinishedLoadingSrc] = useState<string | null>(
    null
  );
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  const hasError = errorSrc === src;
  const isLoading = finishedLoadingSrc !== src && !hasError;

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600",
          className
        )}
        {...rest}
      >
        <ImageOff className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400 dark:text-slate-600" />
        </div>
      )}

      <Image
        alt={alt}
        src={src}
        fill={fill}
        className={cn(
          "h-full w-full object-cover",
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => {
          setFinishedLoadingSrc(src as string);
        }}
        onError={() => {
          setErrorSrc(src as string);
        }}
        {...rest}
      />
    </div>
  );
}
