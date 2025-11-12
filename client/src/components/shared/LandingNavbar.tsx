"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Nav links (unchanged)
const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
];

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full whitespace-nowrap border-b border-slate-200/80 bg-background-light/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-background-dark/80">
      <nav className="flex items-center justify-between px-4 py-4 sm:px-10 lg:px-20">
        <Logo />

        {/* --- Desktop: Nav Links + Log In Button --- */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium leading-normal transition-colors",
                "text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

          {/* --- THIS IS THE FIX --- */}
          {/*
            Changed to `variant="secondary"` (light color)
            and `size="lg"` (bigger) to match the Primary CTA's shape.
          */}
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">Log In</Link>
          </Button>
          {/* --- END FIX --- */}
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

      {/* --- Mobile Menu: Links + Log In Button --- */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="default"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href={link.href} className="flex w-full justify-center">
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>

          {/* --- THIS IS THE FIX (for mobile) --- */}
          {/* Changed to `size="lg"` */}
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">Log In</Link>
          </Button>
          {/* --- END FIX --- */}
        </div>
      )}
    </header>
  );
}
