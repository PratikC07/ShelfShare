import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * A placeholder component shown when the user's library is empty.
 */
export function LibraryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-primary dark:bg-slate-700">
        <ShoppingBag className="h-8 w-8" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
        Your library is empty
      </h2>
      <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
        You haven&apos;t purchased any products yet.
      </p>
      <Button asChild className="mt-6">
        <Link href="/products">Browse Products</Link>
      </Button>
    </div>
  );
}
