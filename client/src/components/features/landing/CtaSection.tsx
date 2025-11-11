import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function CtaSection() {
  return (
    <div className="w-full bg-primary px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Ready to start earning?
          </h2>
          <Button asChild variant="white" size="lg">
            <Link href="/register">
              <span className="truncate">Get Started Now</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
