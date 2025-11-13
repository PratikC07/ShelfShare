"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "./api";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 60,
  });
};

export const useGetProductById = (productId: string | null) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId!),
    enabled: !!productId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useFileDownloader = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const triggerDownload = async (downloadUrl: string, productName: string) => {
    if (!downloadUrl) {
      toast.error("Download URL is missing.");
      return;
    }

    setIsDownloading(true);
    const toastId = toast.loading("Starting download...");

    try {
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error(`Download failed with status: ${response.status}`);
      }

      const blob = await response.blob();

      let extension = "pdf";
      try {
        const urlPath = new URL(downloadUrl).pathname;
        const extensionMatch = urlPath.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
        if (extensionMatch && extensionMatch[1]) {
          extension = extensionMatch[1];
        }
      } catch (e) {
        console.warn("Could not parse downloadUrl for extension", e);
      }
      const safeName = productName
        .replace(/[^a-z0-9_.-]/gi, "_")
        .replace(/__+/g, "_");
      const finalFilename = `${safeName}.${extension}`;

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", finalFilename);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download complete!", { id: toastId });
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Download failed:", err);
      toast.error(error.message || "Download failed.", { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, triggerDownload };
};
