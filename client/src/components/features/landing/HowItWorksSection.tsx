import { Share2, Users, Gift } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="w-full bg-slate-100 py-12 md:py-24 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            How It Works
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            A simple three-step process to earn rewards by sharing with your
            friends.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StepCard
            icon={<Share2 className="h-8 w-8 text-primary" />}
            title="Step 1: Share Your Unique Link"
            description="Find and share your personal referral link with your friends and network."
          />
          <StepCard
            icon={<Users className="h-8 w-8 text-primary" />}
            title="Step 2: Friend Makes a Purchase"
            description="A referral is successful when your friend uses your unique link to purchase any e-book or template from our store."
          />
          <StepCard
            icon={<Gift className="h-8 w-8 text-primary" />}
            title="Step 3: You Both Earn Credit"
            description="Once the purchase is complete, both you and your friend will receive store credit as a reward for your next purchase."
          />
        </div>
      </div>
    </section>
  );
}

// Sub-component for the card
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
    <div className="flex flex-col items-center gap-5 rounded-xl bg-background-light p-8 text-center shadow-lg dark:bg-slate-800">
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
