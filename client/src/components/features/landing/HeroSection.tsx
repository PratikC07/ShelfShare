import { Button } from "@/components/ui/Button";
import { LinkIcon, Award } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full px-4 py-20 sm:px-10 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-black leading-tight tracking-tighter text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
                The Digital Store. Rewarded.
              </h1>
              <p className="mx-auto max-w-xl text-lg font-normal text-slate-600 dark:text-slate-400 lg:mx-0">
                Share your unique link to earn credits on every purchase and get
                exclusive access to our entire library.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button asChild variant="primary" size="lg">
                <Link href="/register">
                  <span className="truncate">Get Started</span>
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/login">
                  <span className="truncate">Log In</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center lg:h-full">
            <div className="absolute h-64 w-64 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30"></div>
            <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/30"></div>
            <div className="relative mx-auto w-full max-w-md space-y-4">
              <div className="relative z-10 w-full -rotate-3 rounded-xl p-6 shadow-xl glass-card">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Referral Link
                  </h3>
                  <div className="flex items-center gap-3 rounded-lg bg-white/50 p-3 dark:bg-slate-900/50">
                    <LinkIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <p className="truncate font-mono text-sm text-slate-800 backdrop-blur-sm dark:text-slate-200">
                      https://.../ref/aB...c9
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative z-20 ml-auto w-3/4 rotate-2 rounded-xl p-6 shadow-2xl glass-card">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Total Credits
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/20 p-2 text-primary">
                      <Award className="h-6 w-6" />
                    </div>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white">
                      2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
