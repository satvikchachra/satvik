import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllPosts, formatDate } from "@/lib/blog";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function HomePage() {
  const projects = getFeaturedProjects();
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Full-viewport centered layout */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Ambient glow */}
        <div className="ambient-glow" aria-hidden="true" />

        <div
          className="relative z-10 w-full"
          style={{ maxWidth: "340px" }}
        >
          {/* ── Header ── */}
          <header
            className="mb-14 animate-fade-in-up stagger-0"
            aria-labelledby="hero-heading"
          >
            <h1
              id="hero-heading"
              className="text-lg tracking-tight mb-1"
              style={{ color: "var(--text)" }}
            >
              satvik chachra
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              builds ai systems &amp; developer tooling
            </p>
          </header>

          {/* ── Recent projects ── */}
          {projects.length > 0 && (
            <section
              aria-labelledby="projects-heading"
              className="mt-14 animate-fade-in-up stagger-5"
            >
              <p className="section-label mb-4">selected work</p>
              <div>
                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.slug}
                    className="flex items-center justify-between py-3"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {project.title}
                    </span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="text-xs link-subtle"
                        >
                          gh ↗
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="text-xs link-subtle"
                        >
                          live ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/projects"
                id="view-all-projects"
                className="text-xs mt-3 inline-block link-subtle"
              >
                all projects →
              </Link>
            </section>
          )}

          {/* ── Recent writing ── */}
          {posts.length > 0 && (
            <section
              aria-labelledby="blog-heading"
              className="mt-10 animate-fade-in-up stagger-6"
            >
              <p className="section-label mb-4">recent writing</p>
              <div>
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    id={`post-${post.slug}`}
                    className="row-link"
                    aria-label={`Read: ${post.title}`}
                  >
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {post.title}
                    </span>
                    <span className="mono-label flex-shrink-0 ml-4">
                      {formatDate(post.date)}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/blog"
                id="view-all-posts"
                className="text-xs mt-3 inline-block link-subtle"
              >
                all posts →
              </Link>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
