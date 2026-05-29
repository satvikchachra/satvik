import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface PostLayoutProps {
  title: string;
  description: string;
  date: string;
  readingTime?: string;
  image: string;
  children: React.ReactNode;
}

import { ShareMenu } from "./share-menu";

/**
 * Shared chrome for ALL blog posts — both MDX and custom page types.
 * Wrap your custom page content in this for consistent header/footer.
 */
export function PostLayout({
  title,
  description,
  date,
  readingTime,
  image,
  children,
}: PostLayoutProps) {
  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">

      {/* Top row */}
      <div className="mb-12 animate-fade-in-up stagger-0">
        <Link
          href="/blog"
          id="back-to-blog"
          className="text-xs inline-block link-subtle"
        >
          ← blog
        </Link>
      </div>

      {/* Post header */}
      <header className="mb-6 animate-fade-in-up stagger-1">
        <div className="mb-8 w-full overflow-hidden rounded-lg border border-border-subtle">
          <Image
            src={image}
            alt={`Cover image for ${title}`}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
          />
        </div>

        <h1
          className="text-lg tracking-tight mb-3 leading-snug text-text"
        >
          {title}
        </h1>

        <p className="text-sm mb-5 leading-relaxed text-text-muted">
          {description}
        </p>

        {/* Meta row */}
        <div
          className="flex flex-wrap items-center justify-between gap-y-2 pb-4 border-b border-border-subtle"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-3">
              {readingTime && <span className="mono-label">{readingTime}</span>}
              {readingTime && <span className="mono-label" aria-hidden="true">·</span>}
              <time dateTime={date} className="mono-label">
                {formatDate(date)}
              </time>
            </div>
          </div>
          <ShareMenu title={title} />
        </div>
      </header>

      {/* Post body */}
      <div className="prose animate-fade-in-up stagger-2">{children}</div>

      {/* Post footer */}
      <footer
        className="mt-16 pt-6 border-t border-border-subtle animate-fade-in-up stagger-3"
      >
        <Link
          href="/blog"
          className="text-xs link-subtle"
        >
          ← back to blog
        </Link>
      </footer>
    </div>
  );
}
