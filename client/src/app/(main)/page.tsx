import { HeroSection } from "@/components/features/landing/HeroSection";
import { HowItWorksSection } from "@/components/features/landing/HowItWorksSection";
import { SocialProofSection } from "@/components/features/landing/SocialProofSection";
import { CtaSection } from "@/components/features/landing/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
