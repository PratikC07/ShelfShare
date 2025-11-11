import { Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-6 border-t border-slate-200/80 px-5 py-10 text-center dark:border-slate-800/80">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <Link
          className="text-sm font-medium leading-normal text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium leading-normal text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          href="#"
        >
          Contact
        </Link>
        <Link
          className="text-sm font-medium leading-normal text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-sm font-medium leading-normal text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          href="#"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex justify-center gap-6">
        <Link
          className="text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          href="#"
        >
          <Twitter className="h-6 w-6" />
        </Link>
        <Link
          className="text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          href="#"
        >
          <Github className="h-6 w-6" />
        </Link>
        <Link
          className="text-slate-500 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-primary"
          href="#"
        >
          <Instagram className="h-6 w-6" />
        </Link>
      </div>
      <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
        © 2025 ShelfShare. All rights reserved.
      </p>
    </footer>
  );
}
