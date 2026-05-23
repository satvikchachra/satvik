import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
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
      {/* Skip to main content (a11y) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded ui-sans text-sm"
        style={{ background: "var(--text)", color: "var(--bg)" }}
      >
        Skip to main content
      </a>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* ================================================
            HERO
        ================================================ */}
        <section aria-labelledby="hero-heading" className="mb-20">
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-semibold mb-6 leading-tight animate-fade-up"
            style={{ color: "var(--text)" }}
          >
            Satvik Chachra
          </h1>
          <div
            className="space-y-4 text-base leading-relaxed animate-fade-up animate-delay-100"
            style={{ color: "var(--text-muted)" }}
          >
            <p>
              I&apos;m an{" "}
              <span style={{ color: "var(--text)" }}>AI-native platform engineer</span>
              {" "}— I design and ship AI coding agents, developer tooling, and
              platform infrastructure that makes engineers dramatically more productive.
            </p>
            <p>
              Currently working as SDE 2, focused on agentic systems, LLM
              observability, and the infrastructure that makes AI-assisted
              development reliable at scale.
            </p>
            <p>
              You can{" "}
              <Link href="/projects" className="text-link" style={{ color: "var(--text)" }}>
                browse my projects
              </Link>
              {" "}or{" "}
              <Link href="/blog" className="text-link" style={{ color: "var(--text)" }}>
                read my writing
              </Link>
              . For anything else,{" "}
              <Link href="/contact" className="text-link" style={{ color: "var(--text)" }}>
                get in touch
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ================================================
            FEATURED PROJECTS
        ================================================ */}
        {projects.length > 0 && (
          <section aria-labelledby="projects-heading" className="mb-20">
            <div className="flex items-baseline justify-between mb-6">
              <h2
                id="projects-heading"
                className="text-lg font-semibold"
                style={{ color: "var(--text)" }}
              >
                Selected Work
              </h2>
              <Link
                href="/projects"
                id="view-all-projects"
                className="ui-sans text-sm flex items-center gap-1 transition-opacity duration-150 hover:opacity-60"
                style={{ color: "var(--text-subtle)" }}
              >
                All projects
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="card p-5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3
                      className="text-sm font-semibold leading-snug"
                      style={{ color: "var(--text)" }}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="transition-opacity duration-150 hover:opacity-60"
                          style={{ color: "var(--text-subtle)" }}
                        >
                          <GitBranch size={14} aria-hidden="true" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="transition-opacity duration-150 hover:opacity-60"
                          style={{ color: "var(--text-subtle)" }}
                        >
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p
                    className="ui-sans text-xs leading-relaxed mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ================================================
            LATEST WRITING
        ================================================ */}
        {posts.length > 0 && (
          <section aria-labelledby="blog-heading" className="mb-20">
            <div className="flex items-baseline justify-between mb-6">
              <h2
                id="blog-heading"
                className="text-lg font-semibold"
                style={{ color: "var(--text)" }}
              >
                Writing
              </h2>
              <Link
                href="/blog"
                id="view-all-posts"
                className="ui-sans text-sm flex items-center gap-1 transition-opacity duration-150 hover:opacity-60"
                style={{ color: "var(--text-subtle)" }}
              >
                All posts
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  id={`post-link-${post.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4 border-t transition-opacity duration-150 hover:opacity-70"
                  style={{
                    borderColor: "var(--border)",
                    borderBottom: i === posts.length - 1 ? `1px solid var(--border)` : undefined,
                  }}
                  aria-label={`Read: ${post.title}`}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {post.title}
                  </span>
                  <span className="mono-label flex-shrink-0">
                    {formatDate(post.date)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================================================
            CTA
        ================================================ */}
        <section aria-labelledby="cta-heading">
          <hr className="divider mb-12" />
          <h2
            id="cta-heading"
            className="text-lg font-semibold mb-3"
            style={{ color: "var(--text)" }}
          >
            Got something interesting?
          </h2>
          <p className="text-base mb-5" style={{ color: "var(--text-muted)" }}>
            I&apos;m always open to conversations about AI systems, developer tooling,
            and building things that matter.
          </p>
          <Link
            href="/contact"
            id="cta-contact-link"
            className="ui-sans inline-flex items-center gap-1.5 text-sm font-medium transition-opacity duration-150 hover:opacity-60"
            style={{ color: "var(--text)" }}
          >
            Get in touch
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </section>

      </div>
    </>
  );
}
