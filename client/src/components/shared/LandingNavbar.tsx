"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatePresence, MotionDiv } from "@/components/ui/motion";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
];

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full whitespace-nowrap border-b border-slate-200/80 bg-background-light/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-background-dark/80">
        <nav className="flex items-center justify-between px-4 py-4 sm:px-10 lg:px-20">
          <Logo />

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
            <Button asChild variant="secondary" size="lg">
              <Link href="/login">Log In</Link>
            </Button>
          </div>

          <div className="relative z-50 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-slate-700 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            key="mobile-menu-landing"
            initial={{ opacity: 0, y: "-20%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-20%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-30 flex h-screen w-full flex-col items-center justify-center gap-6 bg-background-light p-8 pt-20 dark:bg-background-dark"
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                size="lg"
                className="w-full max-w-xs"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href={link.href} className="flex w-full justify-center">
                  {link.label}
                </Link>
              </Button>
            ))}
            <div className="my-4 w-full max-w-xs border-t border-slate-200 dark:border-slate-700"></div>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full max-w-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              variant="primary"
              size="lg"
              className="w-full max-w-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
