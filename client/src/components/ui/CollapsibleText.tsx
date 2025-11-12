"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleTextProps {
  text: string;
  /**
   * Approx. character count to truncate at.
   * "line-clamp" is not 100% reliable for this.
   */
  truncateAt?: number;
}

/**
 * A component that truncates text and provides a
 * "Show more" / "Show less" button.
 */
export function CollapsibleText({
  text,
  truncateAt = 200,
}: CollapsibleTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsTruncation = text.length > truncateAt;

  return (
    <div className="relative">
      <p
        className={cn(
          "text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400",
          !isExpanded && needsTruncation && "line-clamp-3"
        )}
      >
        {text}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
