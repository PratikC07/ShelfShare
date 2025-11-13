export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800">
      <div className="w-full animate-pulse bg-slate-200 aspect-video dark:bg-slate-700"></div>
      <div className="p-6">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="mt-2 h-4 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        <div className="mt-6 h-10 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  );
}
