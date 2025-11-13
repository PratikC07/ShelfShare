import { Share2, Users, Gift } from "lucide-react";
import { MotionDiv, MotionH2, MotionP } from "@/components/ui/motion";

const scrollVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-slate-100 py-12 md:py-24 dark:bg-slate-900"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionDiv
          className="mb-12 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          variants={scrollVariant}
        >
          <MotionH2
            className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white"
            variants={scrollVariant}
          >
            How It Works
          </MotionH2>
          <MotionP
            className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
            variants={scrollVariant}
          >
            A simple three-step process to earn rewards by sharing with your
            friends.
          </MotionP>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollVariant}
            transition={{ delay: 0.1 }}
          >
            <StepCard
              icon={<Share2 className="h-8 w-8 text-primary" />}
              title="Step 1: Share Your Unique Link"
              description="Find and share your personal referral link with your friends and network."
            />
          </MotionDiv>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollVariant}
            transition={{ delay: 0.2 }}
          >
            <StepCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Step 2: Friend Makes a Purchase"
              description="A referral is successful when your friend uses your unique link to purchase any e-book or template from our store."
            />
          </MotionDiv>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollVariant}
            transition={{ delay: 0.3 }}
          >
            <StepCard
              icon={<Gift className="h-8 w-8 text-primary" />}
              title="Step 3: You Both Earn Credit"
              description="Once the purchase is complete, both you and your friend will receive store credit as a reward for your next purchase."
            />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-xl bg-background-light p-8 text-center shadow-lg dark:bg-slate-800 h-full">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm leading-normal text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
