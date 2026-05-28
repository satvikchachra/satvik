import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostLayoutProps {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTime?: string;
  children: React.ReactNode;
}

/**
 * Shared chrome for ALL blog posts — both MDX and custom page types.
 * Wrap your custom page content in this for consistent header/footer.
 */
export function PostLayout({
  title,
  description,
  date,
  tags = [],
  readingTime,
  children,
}: PostLayoutProps) {
  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">

      {/* Back link */}
      <Link
        href="/blog"
        id="back-to-blog"
        className="text-xs mb-12 inline-block link-subtle"
      >
        ← writing
      </Link>

      {/* Post header */}
      <header className="mb-6">
        <h1
          className="text-lg tracking-tight mb-3 leading-snug"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h1>

        <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>

        {/* Meta row */}
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1 pb-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-3">
            {readingTime && <span className="mono-label">{readingTime}</span>}
            {readingTime && <span className="mono-label" aria-hidden="true">·</span>}
            <time dateTime={date} className="mono-label">
              {formatDate(date)}
            </time>
          </div>
          {tags.length > 0 && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="mono-label hidden sm:inline" aria-hidden="true">·</span>
              <span className="mono-label">{tags.join(", ")}</span>
            </div>
          )}
        </div>
      </header>

      {/* Post body */}
      <div className="prose">{children}</div>

      {/* Post footer */}
      <footer
        className="mt-16 pt-6"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <Link
          href="/blog"
          className="text-xs link-subtle"
        >
          ← back to writing
        </Link>
      </footer>
    </div>
  );
}
