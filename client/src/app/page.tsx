import { HeroSection } from "@/components/features/landing/HeroSection";
import { HowItWorksSection } from "@/components/features/landing/HowItWorksSection";
import { SocialProofSection } from "@/components/features/landing/SocialProofSection";
import { CtaSection } from "@/components/features/landing/CtaSection";
import { LandingNavbar } from "@/components/shared/LandingNavbar";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        <LandingNavbar />
        <main className="flex-1">
          <HeroSection />
          <HowItWorksSection />
          <SocialProofSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
