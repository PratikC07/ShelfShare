"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleTextProps {
  text: string;
  /**
   * The number of lines to truncate the text to.
   * @default 3
   */
  lines?: number;
  /**
   * Approx. character count to show the "Show more" button.
   * @default 200
   */
  characterThreshold?: number;
}

/**
 * A component that truncates text and provides a
 * "Show more" / "Show less" button.
 */
export function CollapsibleText({
  text,
  lines = 3,
  characterThreshold = 200,
}: CollapsibleTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsTruncation = text.length > characterThreshold;

  return (
    <div className="relative">
      <p
        className={cn(
          "text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400",
          // Use arbitrary value for dynamic line clamping
          !isExpanded && needsTruncation && `line-clamp-[${lines}]`
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
