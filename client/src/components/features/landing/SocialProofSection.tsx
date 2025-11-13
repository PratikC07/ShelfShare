import { UserCircle2 } from "lucide-react";
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

export function SocialProofSection() {
  return (
    <section id="testimonials" className="w-full py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionDiv
          className="mb-12 flex flex-col items-center justify-center sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          variants={scrollVariant}
        >
          <MotionH2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            variants={scrollVariant}
          >
            What our users are saying
          </MotionH2>
          <MotionP
            className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400"
            variants={scrollVariant}
          >
            Discover how our community is benefiting from the referral and
            credit system.
          </MotionP>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollVariant}
            transition={{ delay: 0.1 }}
          >
            <TestimonialCard
              quote="This is the best referral system I've ever used. Incredibly intuitive and rewarding! I've already earned enough credits for my next template purchase."
              name="Ryan K."
              title="Digital Creator"
            />
          </MotionDiv>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollVariant}
            transition={{ delay: 0.2 }}
          >
            <TestimonialCard
              quote="The referral system is so easy to use. I earned enough credits for a new e-book in just a week! The quality of the content is outstanding."
              name="Sarah J."
              title="Marketing Specialist"
            />
          </MotionDiv>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollVariant}
            transition={{ delay: 0.3 }}
          >
            <TestimonialCard
              quote="I love how valuable the credits are. It feels great to get premium templates just by sharing with friends. A must-have for any serious designer."
              name="Michael B."
              title="Freelance Designer"
            />
          </MotionDiv>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollVariant}
            transition={{ delay: 0.4 }}
          >
            <TestimonialCard
              quote="Praising the quality of the e-books acquired is an understatement. The content is top-notch. Sharing with my network was a no-brainer."
              name="Emily R."
              title="Content Strategist"
            />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

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
    <div className="flex h-full flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border dark:border-white/10 dark:bg-background-dark/50 dark:hover:shadow-primary/10">
      <blockquote className="text-gray-700 dark:text-gray-300">
        <p className="text-base leading-relaxed">{quote}</p>
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        <UserCircle2 className="h-12 w-12 text-slate-400" />
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
}
