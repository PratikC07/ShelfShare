"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full whitespace-nowrap border-b border-slate-200/80 bg-background-light/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-background-dark/80">
      <nav className="flex items-center justify-between px-4 py-4 sm:px-10 lg:px-20">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            <a
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
              href="#pricing"
            >
              Pricing
            </a>
          </div>
          <Button asChild variant="primary" size="default">
            <Link href="/login">
              <span className="truncate">Log In</span>
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu (basic example) */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
          <a
            href="#features"
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300"
          >
            Pricing
          </a>
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
