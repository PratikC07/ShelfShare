"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { MotionDiv } from "@/components/ui/motion";

interface ReferralCardProps {
  referralCode: string;
}

/**
 * A "Bento Box" card for displaying and copying the user's referral link.
 */
export function ReferralCard({ referralCode }: ReferralCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [referralUrl, setReferralUrl] = useState("");

  // We must use useEffect to construct the URL,
  // as window.location.origin is not available on the server.
  useEffect(() => {
    setReferralUrl(
      `${window.location.origin}/register?referralCode=${referralCode}`
    );
  }, [referralCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(
      () => {
        setIsCopied(true);
        toast.success("Referral link copied!");
      },
      (err) => {
        toast.error("Failed to copy link.");
      }
    );
  };

  // Reset the "Copied!" button after a delay
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <MotionDiv
      className="lg:col-span-2 flex flex-col gap-6 rounded-xl bg-white dark:bg-slate-800 p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Your Unique Referral Link
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Share this link with friends to earn credits when they make a
          purchase.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          className="w-full flex-1 rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2 font-mono text-sm text-slate-500 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
          readOnly
          type="text"
          value={referralUrl || "Loading link..."}
        />
        <Button
          onClick={handleCopy}
          disabled={isCopied || !referralUrl}
          variant={isCopied ? "secondary" : "primary"}
          className="w-full sm:w-auto"
        >
          {isCopied ? (
            <CheckCircle className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {isCopied ? "Copied!" : "Copy Link"}
        </Button>
      </div>
    </MotionDiv>
  );
}

/**
 * A skeleton placeholder for the ReferralCard.
 */
export function ReferralCardSkeleton() {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6 rounded-xl bg-white dark:bg-slate-800 p-6 shadow-lg">
      <div className="flex flex-col">
        <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-10 w-full flex-1 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-10 w-full sm:w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  );
}
