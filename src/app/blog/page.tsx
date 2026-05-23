import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Writing by Satvik Chachra on AI systems, platform engineering, and deep dives into CS, math, and science.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <header className="mb-16">
        <p className="mono-label mb-4">thoughts & deep dives</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--text)" }}>
          Blog
        </h1>
        <p className="text-base max-w-lg" style={{ color: "var(--text-muted)" }}>
          A mix of opinion pieces, engineering case studies, and interactive
          explorations of concepts I find interesting — AI, distributed
          systems, math, physics.
        </p>
      </header>

      {posts.length === 0 ? (
        <div
          className="py-20 text-center rounded-xl border"
          style={{ borderColor: "var(--border)", background: "var(--bg-alt)" }}
        >
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent)" }}>
            // coming soon
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Posts are on their way. Drop in again soon.
          </p>
        </div>
      ) : (
        <ol role="list" className="space-y-0">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                id={`blog-post-${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  borderBottom:
                    i === posts.length - 1
                      ? `1px solid var(--border)`
                      : undefined,
                }}
                aria-label={`Read: ${post.title}`}
              >
                <div className="flex-1 min-w-0">
                  {/* Tags row */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span
                      className="mono-label"
                      aria-label={`Post type: ${post.type}`}
                    >
                      {post.type === "custom" ? "✦ custom" : "✦ article"}
                    </span>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <h2
                    className="text-sm font-semibold mb-1 transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <time
                      dateTime={post.date}
                      className="mono-label block"
                    >
                      {formatDate(post.date)}
                    </time>
                    {post.readingTime && (
                      <span className="mono-label">{post.readingTime}</span>
                    )}
                  </div>
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
