import { Button } from "@/components/ui/Button";
import { LinkIcon, Award, Star, ArrowDown } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionH1, MotionP } from "@/components/ui/motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center px-4 py-20 sm:px-10 lg:px-20 lg:py-28">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30"></div>
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/30"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
          {/* Animated Text Content (unchanged) */}
          <MotionDiv
            className="flex flex-col gap-8 text-center lg:text-left" // Gap increased to '8'
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            <div className="flex flex-col gap-4">
              <MotionH1
                className="text-4xl font-black leading-tight tracking-tighter text-slate-900 sm:text-5xl md:text-7xl dark:text-white"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                The Digital Store. Rewarded.
              </MotionH1>
              <MotionP
                className="mx-auto max-w-xl text-lg font-normal text-slate-600 dark:text-slate-400 lg:mx-0"
                variants={variants}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Share your unique link to earn credits on every purchase and get
                exclusive access to our entire library.
              </MotionP>
            </div>
            <MotionDiv
              className="flex flex-col items-center gap-2 lg:items-start"
              variants={variants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Trusted by 1,000+ digital creators and marketers.
              </p>
            </MotionDiv>
            <MotionDiv
              className="flex justify-center lg:justify-start"
              variants={variants}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild variant="primary" size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
            </MotionDiv>
          </MotionDiv>

          {/* Animated Glass Cards (unchanged) */}
          <div className="relative flex min-h-[400px] items-center justify-center lg:h-full">
            <div className="relative mx-auto w-full max-w-md space-y-4 ">
              <MotionDiv
                className="relative z-10 w-full -rotate-3 rounded-xl p-6 shadow-xl glass-card"
                initial={{ opacity: 0, x: 50, rotate: -3 }}
                animate={{ opacity: 1, x: 0, rotate: -3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
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
              </MotionDiv>
              <MotionDiv
                className="relative z-20 ml-auto w-3/4 rotate-2 rounded-xl p-6 shadow-2xl glass-card"
                initial={{ opacity: 0, x: 50, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 2 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
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
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>

      <MotionDiv
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{
          delay: 1.5,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <a
          href="#how-it-works"
          aria-label="Scroll to next section"
          className="rounded-full p-2 transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
        >
          <ArrowDown className="h-6 w-6 text-slate-400 dark:text-slate-600" />
        </a>
      </MotionDiv>
    </section>
  );
}
