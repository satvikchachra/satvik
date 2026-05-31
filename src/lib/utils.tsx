import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format resume text with support for:
 * - **bold** -> <b> (used for core systems, key products, and tech)
 * - __underline__ -> <span> (used for leadership, ownership, and scope verbs)
 */
export function formatResumeText(text: string): React.ReactNode {
  if (!text) return '';

  // Split using regex that captures two syntax types:
  // 1. **bold**
  // 2. __underline__
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  const seen = new Map<string, number>();

  return parts.map((part) => {
    const count = seen.get(part) ?? 0;
    seen.set(part, count + 1);
    const key = `${part}:${count}`;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <b key={key} className="font-semibold text-text">
          {formatResumeText(part.slice(2, -2))}
        </b>
      );
    }
    if (part.startsWith('__') && part.endsWith('__')) {
      return (
        <span key={key} className="resume-underline">
          {formatResumeText(part.slice(2, -2))}
        </span>
      );
    }
    return part;
  });
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
