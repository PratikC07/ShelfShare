import { MotionDiv } from "@/components/ui/motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
  valueClassName?: string;
}

export function StatCard({
  title,
  value,
  icon,
  className,
  valueClassName,
}: StatCardProps) {
  return (
    <MotionDiv
      className={cn(
        "flex flex-col justify-between gap-4 rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-slate-600 dark:text-slate-400">
          {title}
        </p>
        <div className="text-slate-500 dark:text-slate-400">{icon}</div>
      </div>
      <p
        className={cn(
          "text-4xl sm:text-5xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white",
          valueClassName
        )}
      >
        {value}
      </p>
    </MotionDiv>
  );
}

export function StatCardSkeleton() {
  return (
    <div
      className="flex flex-col justify-between gap-4 rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800"
      style={{ minHeight: "150px" }}
    >
      <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
      <div className="h-12 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
    </div>
  );
}
