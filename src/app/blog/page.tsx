import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Writing by Satvik Chachra on AI systems, full stack engineering, and deep dives into CS, math, and science.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">

      <header className="mb-16 animate-fade-in-up stagger-0">
        <h1
          className="text-lg tracking-tight mb-2"
          style={{ color: "var(--text)" }}
        >
          writing
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Opinion pieces, engineering case studies, and explorations of things
          I find interesting — AI, distributed systems, math, physics.
        </p>
      </header>

      {posts.length === 0 ? (
        <div
          className="py-16 animate-fade-in-up stagger-1"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p className="text-sm mb-1" style={{ color: "var(--text)" }}>
            posts are on their way.
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            drop in again soon.
          </p>
        </div>
      ) : (
        <ol
          role="list"
          className="animate-fade-in-up stagger-1"
          aria-label="Blog posts"
        >
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                id={`blog-post-${post.slug}`}
                className="row-link group"
                aria-label={`Read: ${post.title}`}
                style={{
                  animationDelay: `${(i + 1) * 50}ms`,
                  alignItems: "flex-start",
                }}
              >
                <div className="flex-1 min-w-0 pr-8">
                  <span
                    className="text-sm block mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    <span className="animated-underline">{post.title}</span>
                    <span className="row-link-arrow text-xs ml-1.5 inline-block">↗</span>
                  </span>
                  {post.description && (
                    <span
                      className="text-xs leading-relaxed block"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      {post.description}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                  <time dateTime={post.date} className="mono-label">
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
