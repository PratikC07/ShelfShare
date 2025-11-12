"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full whitespace-nowrap border-b border-slate-200/80 bg-background-light/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-background-dark/80">
      <nav className="flex items-center justify-between px-4 py-4 sm:px-10 lg:px-20">
        <Logo />

        {/* --- Desktop: "Log In" Button Only --- */}
        <div className="hidden items-center gap-8 md:flex flex-1 justify-end">
          <Button asChild variant="primary" size="default">
            <Link href="/login">
              <span className="truncate">Log In</span>
            </Link>
          </Button>
        </div>

        {/* --- Mobile Nav Button --- */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu: "Log In" Button Only --- */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
          <Button asChild variant="primary" size="default">
            <Link href="/login">
              <span className="truncate">Log In</span>
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
