import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 text-slate-900 dark:text-white"
    >
      <div className="size-6 text-primary">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.657 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <h2 className="text-lg font-bold leading-tight tracking-tighter">
        ShelfShare
      </h2>
    </Link>
  );
}
