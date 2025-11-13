"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleTextProps {
  text: string;
  lines?: number;
  characterThreshold?: number;
}

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
          "text-justify"
        )}
        style={
          !isExpanded && needsTruncation
            ? {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: lines,
                overflow: "hidden",
              }
            : undefined
        }
      >
        {text}
      </p>

      {!isExpanded && needsTruncation && (
        <div
          className={cn(
            "absolute bottom-0 right-0 flex h-[1.65rem] items-center",
            "bg-white dark:bg-slate-900 ",
            "pl-1"
          )}
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm font-medium text-primary hover:underline"
          >
            Show more
          </button>
        </div>
      )}

      {isExpanded && needsTruncation && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
}
