/**
 * A reusable skeleton loader for the product modal content.
 */
export function ProductModalSkeleton() {
  return (
    <div className="flex w-full flex-col">
      {/* Image */}
      <div className="aspect-video w-full animate-pulse bg-slate-200 dark:bg-slate-700"></div>
      {/* Content */}
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-5 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="mt-4 h-12 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  );
}
