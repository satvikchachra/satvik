import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
      {/* Reading progress bar (CSS scroll-driven, no JS fallback) */}
      <div className="progress-bar" aria-hidden="true" />

      {/* Back link */}
      <Link
        href="/blog"
        id="back-to-blog"
        className="inline-flex items-center gap-2 mb-12 text-xs font-mono transition-colors duration-200 group"
        style={{ color: "var(--text-subtle)" }}
      >
        <ArrowLeft
          size={13}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-1"
        />
        back to blog
      </Link>

      {/* Post header */}
      <header className="mb-12">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6" aria-label="Post tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <h1
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h1>

        <p className="text-base mb-6" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center gap-4 pb-8 border-b"
          style={{ borderColor: "var(--border)" }}
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
          <span className="mono-label" aria-hidden="true">·</span>
          <span className="mono-label">Satvik Chachra</span>
        </div>
      </header>

      {/* Post body */}
      <div className="prose">{children}</div>

      {/* Post footer */}
      <footer className="mt-16 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono transition-colors duration-200 group"
          style={{ color: "var(--accent)" }}
        >
          <ArrowLeft
            size={13}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to all posts
        </Link>
      </footer>
    </div>
  );
}
