import { UserCircle2 } from "lucide-react";

export function SocialProofSection() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-center sm:mb-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            What our users are saying
          </h2>
          <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
            Discover how our community is benefiting from the referral and
            credit system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <TestimonialCard
            quote="This is the best referral system I've ever used. Incredibly intuitive and rewarding! I've already earned enough credits for my next template purchase."
            name="Ryan K."
            title="Digital Creator"
          />
          <TestimonialCard
            quote="The referral system is so easy to use. I earned enough credits for a new e-book in just a week! The quality of the content is outstanding."
            name="Sarah J."
            title="Marketing Specialist"
          />
          <TestimonialCard
            quote="I love how valuable the credits are. It feels great to get premium templates just by sharing with friends. A must-have for any serious designer."
            name="Michael B."
            title="Freelance Designer"
          />
          <TestimonialCard
            quote="Praising the quality of the e-books acquired is an understatement. The content is top-notch. Sharing with my network was a no-brainer."
            name="Emily R."
            title="Content Strategist"
          />
        </div>
      </div>
    </section>
  );
}

// Sub-component for the card
function TestimonialCard({
  quote,
  name,
  title,
}: {
  quote: string;
  name: string;
  title: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border dark:border-white/10 dark:bg-background-dark/50 dark:hover:shadow-primary/10">
      <blockquote className="text-gray-700 dark:text-gray-300">
        <p className="text-base leading-relaxed">{quote}</p>
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        {/* Using an icon as a placeholder for the avatar */}
        <UserCircle2 className="h-12 w-12 text-slate-400" />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
}
