import React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format resume text with support for:
 * - **bold** -> <strong> (used for core systems, key products, and tech)
 * - __underline__ -> <span> (used for leadership, ownership, and scope verbs)
 */
export function formatResumeText(text: string): React.ReactNode {
  if (!text) return "";
  
  // Split using regex that captures two syntax types:
  // 1. **bold**
  // 2. __underline__
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return React.createElement(
        "strong",
        // eslint-disable-next-line react/no-array-index-key
        { key: index, className: "font-semibold text-[var(--text)]" },
        formatResumeText(part.slice(2, -2))
      );
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return React.createElement(
        "span",
        // eslint-disable-next-line react/no-array-index-key
        { key: index, className: "resume-underline" },
        formatResumeText(part.slice(2, -2))
      );
    }
    return part;
  });
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
