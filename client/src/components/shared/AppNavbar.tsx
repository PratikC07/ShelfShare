"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  ShoppingBag,
  LayoutDashboard,
  BookOpenCheck,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";
import { type User as AuthUser } from "@/features/auth/types";
import { AnimatePresence, MotionDiv } from "@/components/ui/motion";

const navLinks = [
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/library", label: "My Library", icon: BookOpenCheck },
];

export function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

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
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-background-light/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-background-dark/80">
        <nav className="flex items-center justify-between px-4 py-4 sm:px-10 lg:px-20">
          <Logo />

          <div className="hidden flex-1 items-center justify-center md:flex">
            {user && (
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium leading-normal transition-colors",
                      pathname === link.href
                        ? "text-primary"
                        : "text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <>
                <Button asChild variant="ghost" size="default">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild variant="primary" size="default">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
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
            key="mobile-menu"
            initial={{ opacity: 0, y: "-20%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-20%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-30 flex h-screen w-full flex-col items-center justify-center gap-6 bg-background-light p-8 pt-20 dark:bg-background-dark"
          >
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant={pathname === link.href ? "primary" : "ghost"}
                    size="lg"
                    className="w-full max-w-xs"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="flex w-full justify-start gap-3"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </Button>
                ))}

                <div className="my-4 w-full max-w-xs border-t border-slate-200 dark:border-slate-700"></div>

                <div className="flex w-full max-w-xs items-center gap-3 px-4 py-2">
                  <User className="h-6 w-6 rounded-full bg-slate-200 p-1 dark:bg-slate-700" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full max-w-xs"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full max-w-xs"
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full max-w-xs"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}

function UserDropdown({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => void;
}) {
  return (
    <HeadlessMenu as="div" className="relative">
      <HeadlessMenu.Button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
        <User className="h-5 w-5" />
      </HeadlessMenu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-800 dark:ring-white/10">
          <div className="border-b border-slate-200 px-3 py-2 dark:border-slate-700">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
              {user.name}
            </p>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
          <div className="p-1">
            <HeadlessMenu.Item>
              {({ active }) => (
                <button
                  onClick={onLogout}
                  className={cn(
                    "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm",
                    active
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white"
                      : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              )}
            </HeadlessMenu.Item>
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
}
