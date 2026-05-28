"use client";

import Link from "next/link";
import type { Post } from "@/lib/blog";
import { FEATURE_FLAGS } from "@/lib/feature-flags";
import { useFilterPanel } from "@/hooks/use-filter-panel";
import { FilterPanel } from "@/components/ui/filter-panel";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BlogListProps {
  posts: Post[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const {
    activeTags,
    filterOpen,
    panelRef,
    panelHeight,
    activeCount,
    toggleTag,
    clearFilters,
    setFilterOpen,
  } = useFilterPanel(allTags);

  const filtered =
    activeTags.size === 0
      ? posts
      : posts.filter((p) => p.tags.some((t) => activeTags.has(t)));

  return (
    <>
      {FEATURE_FLAGS.filterBlogs && allTags.length > 0 && (
        <FilterPanel
          id="blog"
          label="filter by tag"
          panelAriaLabel="Filter blog posts by tag"
          allTags={allTags}
          activeTags={activeTags}
          activeCount={activeCount}
          filterOpen={filterOpen}
          panelHeight={panelHeight}
          panelRef={panelRef}
          onToggleOpen={() => setFilterOpen((v) => !v)}
          onToggleTag={toggleTag}
          onClear={clearFilters}
        />
      )}

      {filtered.length === 0 ? (
        <div
          className="py-16"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p className="text-sm mb-1" style={{ color: "var(--text)" }}>
            no posts match that filter.
          </p>
        </div>
      ) : (
        <ol role="list" aria-label="Blog posts">
          {filtered.map((post, i) => (
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
                    <span className="row-link-arrow text-xs ml-1.5 inline-block">
                      ↗
                    </span>
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
    </>
  );
}
