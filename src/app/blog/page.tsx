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
        <h1
          className="text-4xl md:text-5xl font-semibold mb-6"
          style={{ color: "var(--text)" }}
        >
          Blog
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
          A mix of opinion pieces, engineering case studies, and interactive
          explorations of concepts I find interesting — AI, distributed
          systems, math, physics.
        </p>
      </header>

      {posts.length === 0 ? (
        <div
          className="py-20 text-center border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="ui-sans text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
            Posts are on their way.
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Drop in again soon.
          </p>
        </div>
      ) : (
        <ol role="list" className="space-y-0 border-t" style={{ borderColor: "var(--border)" }}>
          {posts.map((post) => (
            <li key={post.slug} className="border-b" style={{ borderColor: "var(--border)" }}>
              <Link
                href={`/blog/${post.slug}`}
                id={`blog-post-${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-6 transition-opacity duration-150 hover:opacity-70"
                aria-label={`Read: ${post.title}`}
              >
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                    {post.description}
                  </p>
                  
                  {/* Tags row */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 sm:mt-1">
                  <div className="text-right">
                    <time
                      dateTime={post.date}
                      className="mono-label block mb-1"
                    >
                      {formatDate(post.date)}
                    </time>
                    {post.readingTime && (
                      <span className="mono-label" style={{ color: "var(--text-subtle)" }}>
                        {post.readingTime}
                      </span>
                    )}
                  </div>
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="flex-shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                    style={{ color: "var(--text-subtle)" }}
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
