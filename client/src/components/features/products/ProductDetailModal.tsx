"use client";

import { Fragment, useState, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, AlertCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import { useGetProductById } from "@/features/products/hooks";
import {
  usePurchaseProduct,
  useGetMyPurchases,
} from "@/features/purchase/hooks";
import { useAuthStore } from "@/store/auth.store";

// Import the "dumb" view components
import { ProductDetailView } from "./ProductDetailView";
import { ProductCheckoutView } from "./ProductCheckoutView";
import { ProductModalSkeleton } from "./ProductModalSkeleton";

interface ProductDetailModalProps {
  productId: string;
  onClose: () => void;
}

/**
 * "Smart" container component for the product detail modal.
 * Handles all data fetching and state logic, then passes
 * props down to the "dumb" view components.
 */
export function ProductDetailModal({
  productId,
  onClose,
}: ProductDetailModalProps) {
  const [view, setView] = useState<"details" | "checkout">("details");

  // 1. Get Hooks
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;
  const { data: product, isLoading, isError } = useGetProductById(productId);
  const { data: myPurchases } = useGetMyPurchases();
  const { mutate: purchase, isPending: isPurchasing } = usePurchaseProduct();

  // 2. Derive State
  const isOwned = useMemo(
    () => !!myPurchases?.some((p) => p._id === productId),
    [myPurchases, productId]
  );

  // 3. Define Event Handlers
  const handleConfirmPurchase = () => {
    purchase(
      { productId },
      {
        onSuccess: () => {
          onClose();
          setTimeout(() => setView("details"), 300);
        },
      }
    );
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setView("details"), 300);
  };

  // 4. Render Logic
  const renderContent = () => {
    if (isLoading) {
      return <ProductModalSkeleton />;
    }

    if (isError || !product) {
      return (
        <div className="flex h-96 w-full flex-col items-center justify-center gap-4 p-8 text-center text-red-600 dark:text-red-400">
          <AlertCircle className="h-12 w-12" />
          <h3 className="text-xl font-bold">Error</h3>
          <p>Could not load product details. Please try again later.</p>
        </div>
      );
    }

    return (
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false}>
          {view === "details" ? (
            <ProductDetailView
              product={product}
              isOwned={isOwned}
              isLoggedIn={isLoggedIn}
              onGoToCheckout={() => setView("checkout")}
            />
          ) : (
            <ProductCheckoutView
              product={product}
              onBack={() => setView("details")}
              onConfirm={handleConfirmPurchase}
              isPurchasing={isPurchasing}
            />
          )}
        </AnimatePresence>
      </div>
    );
  };

  // 5. Render Modal Frame
  return (
    <Transition appear show={!!productId} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all dark:bg-slate-900">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={handleClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {renderContent()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
