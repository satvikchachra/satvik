import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getAllPosts, getAllBlogTags } from "@/lib/blog";
import { BlogList } from "@/components/blog/blog-list";
import { DevPrivateToggle } from "@/components/blog/dev-private-toggle";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Blog by Satvik Chachra on AI systems, full stack engineering, and deep dives into CS, math, and science.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllBlogTags();

  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">
      {/* Header */}
      <header className="mb-12 animate-fade-in-up stagger-0">
        <h1 id="blog-heading" className="text-lg tracking-tight mb-2 text-text">
          blog
        </h1>
        <p
          className="text-sm leading-relaxed text-text-muted"
        >
          Opinion pieces, engineering case studies, and explorations of things
          I find interesting — AI, distributed systems, math, physics.
        </p>
      </header>

      {posts.length === 0 ? (
        <div
          className="py-16 animate-fade-in-up stagger-1 border-t border-border-subtle"
        >
          <p className="text-sm mb-1 text-text">
            posts are on their way.
          </p>
          <p className="text-sm text-text-muted">
            drop in again soon.
          </p>
        </div>
      ) : (
        <div className="animate-fade-in-up stagger-1">
          <DevPrivateToggle>
            <BlogList posts={posts} allTags={tags} />
          </DevPrivateToggle>
        </div>
      )}
    </div>
  );
}
