"use client";

import { useState } from "react";
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
import { usePathname } from "next/navigation";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";
import { type User as AuthUser } from "@/features/auth/types"; // Import our central User type

// Define navigation links for authenticated users
const navLinks = [
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/library", label: "My Library", icon: BookOpenCheck },
];

export function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  //
  // --- FIX 1: Use granular selectors ---
  //
  // Get auth state and actions from our store
  // This prevents creating a new object on every render and fixes the error
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    // Optionally, redirect to home or login page
    // router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-background-light/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-background-dark/80">
      <nav className="flex items-center justify-between px-4 py-4 sm:px-10 lg:px-20">
        <Logo />

        {/* --- Desktop Nav --- */}
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

        {/* --- Auth Buttons & User Menu (Desktop) --- */}
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

        {/* --- Mobile Menu Button --- */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant={pathname === link.href ? "primary" : "ghost"}
                  size="default"
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
              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="flex items-center gap-3 px-4 py-2">
                <User className="h-6 w-6 rounded-full bg-slate-200 p-1 dark:bg-slate-700" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="default"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full justify-start gap-3"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="secondary" size="default">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild variant="primary" size="default">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

//
// --- FIX 2: Use the correct User type, not 'any' ---
//
function UserDropdown({
  user,
  onLogout,
}: {
  user: AuthUser; // Use the imported User type
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
        <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-800 dark:ring-white/10">
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
