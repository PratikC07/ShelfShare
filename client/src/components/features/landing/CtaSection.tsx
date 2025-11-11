import { Button } from "@/components/ui/Button";
import Link from "next/link";
// Import our new motion components
import { MotionDiv, MotionH2 } from "@/components/ui/motion";

export function CtaSection() {
  return (
    <div className="w-full bg-primary px-4 py-20 sm:px-6 lg:px-8">
      <MotionDiv
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-6">
          <MotionH2
            className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to start earning?
          </MotionH2>
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild variant="white" size="lg">
              <Link href="/register">
                <span className="truncate">Get Started Now</span>
              </Link>
            </Button>
          </MotionDiv>
        </div>
      </MotionDiv>
    </div>
  );
}
