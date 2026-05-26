import Link from "next/link";
import { formatDate } from "@/lib/blog";

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
      <header className="mb-12">
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
          className="flex items-center gap-3 pb-8"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <time dateTime={date} className="mono-label">
            {formatDate(date)}
          </time>
          {readingTime && (
            <>
              <span className="mono-label" aria-hidden="true">·</span>
              <span className="mono-label">{readingTime}</span>
            </>
          )}
          {tags.length > 0 && (
            <>
              <span className="mono-label" aria-hidden="true">·</span>
              <span className="mono-label">{tags.join(", ")}</span>
            </>
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
