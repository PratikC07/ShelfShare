"use client";

import { useMemo } from "react";
import { AlertCircle, Users, CreditCard, GitPullRequest } from "lucide-react";
import { MotionDiv, MotionH1 } from "@/components/ui/motion";
import {
  useGetDashboardStats,
  useDashboardStream,
} from "@/features/dashboard/hooks";
import {
  StatCard,
  StatCardSkeleton,
} from "@/components/features/dashboard/StatCard";
import {
  ReferralCard,
  ReferralCardSkeleton,
} from "@/components/features/dashboard/ReferralCard";

export default function DashboardPage() {
  // 1. Fetch initial data
  const { data, isLoading, isError, error } = useGetDashboardStats();

  // 2. Connect to the real-time stream
  // This hook works in the background and updates the `data` above.
  useDashboardStream();

  // 3. Calculate derived state (Conversion Rate)
  const conversionRate = useMemo(() => {
    if (!data || !data.referredUsersCount) {
      return 0; // Avoid divide-by-zero
    }
    return (data.convertedUsersCount / data.referredUsersCount) * 100;
  }, [data]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ReferralCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      );
    }

    if (isError || !data) {
      return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-500 bg-white p-12 text-center text-red-700 dark:bg-slate-800 dark:text-red-400">
          <AlertCircle className="h-12 w-12" />
          <h2 className="mt-6 text-xl font-bold">Error Loading Dashboard</h2>
          <p className="mt-2 text-base">
            {error?.message || "Please try again later."}
          </p>
        </div>
      );
    }

    // 4. Render the full dashboard with data
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ReferralCard referralCode={data.referralCode} />
        <StatCard
          title="Total Credits Earned"
          value={data.totalCredits}
          icon={<CreditCard className="h-5 w-5" />}
          valueClassName="text-primary"
        />
        <StatCard
          title="Users Referred"
          value={data.referredUsersCount}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Successful Conversions"
          value={data.convertedUsersCount}
          icon={<GitPullRequest className="h-5 w-5" />}
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          icon={<GitPullRequest className="h-5 w-5" />}
        />
      </div>
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <MotionDiv
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionH1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
          Your Dashboard
        </MotionH1>
      </MotionDiv>

      {renderContent()}
    </main>
  );
}
