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

const FOCUS_AREAS = [
  {
    icon: "⬡",
    title: "AI Coding Agents",
    description:
      "Designing agentic loops that reason, plan, and execute across codebases. Tool use, context windows, and multi-step orchestration.",
  },
  {
    icon: "⌬",
    title: "Platform Engineering",
    description:
      "Infrastructure for developer tools — sandboxes, execution engines, language servers, and real-time collaboration at scale.",
  },
  {
    icon: "◈",
    title: "Intelligent Systems",
    description:
      "Bringing ML into production: LLM observability, RAG pipelines, structured outputs, and evaluation frameworks.",
  },
] as const;

export default function HomePage() {
  const projects = getFeaturedProjects();
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Skip to main content (a11y) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded"
        style={{ background: "var(--accent)", color: "var(--bg)" }}
      >
        Skip to main content
      </a>

      <div className="min-h-screen">
        {/* ================================================
            HERO
        ================================================ */}
        <section
          aria-labelledby="hero-heading"
          className="relative max-w-5xl mx-auto px-6 pt-36 pb-24 overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(ellipse at center, rgba(var(--accent-rgb), 0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative">
            {/* Mono tag */}
            <p
              className="mono-label mb-6 animate-fade-up"
              aria-label="Role: SDE 2"
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-2 animate-pulse"
                style={{ background: "var(--green)" }}
                aria-hidden="true"
              />
              SDE 2 · AI-Native Platform Engineering
            </p>

            {/* Main heading */}
            <h1
              id="hero-heading"
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none mb-6 animate-fade-up animate-delay-100"
              style={{ color: "var(--text)" }}
            >
              Building AI that{" "}
              <span className="gradient-text">builds.</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-fade-up animate-delay-200"
              style={{ color: "var(--text-muted)" }}
            >
              I'm{" "}
              <strong style={{ color: "var(--text)" }}>Satvik Chachra</strong>{" "}
              — I design and ship AI coding agents, developer tooling, and
              platform infrastructure that makes engineers dramatically more
              productive.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-300">
              <Link
                href="/projects"
                id="hero-cta-projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                View projects
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                id="hero-cta-blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  background: "transparent",
                }}
              >
                Read the blog
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================
            WHAT I DO
        ================================================ */}
        <section
          aria-labelledby="focus-heading"
          className="max-w-5xl mx-auto px-6 py-20"
        >
          <h2 id="focus-heading" className="sr-only">
            What I do
          </h2>
          <p className="mono-label mb-10">what i do</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ background: "var(--border)" }}>
            {FOCUS_AREAS.map((area, i) => (
              <article
                key={area.title}
                className="p-8 transition-colors duration-200 animate-fade-up"
                style={{
                  background: "var(--bg)",
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <span
                  className="text-2xl font-mono mb-4 block"
                  style={{ color: "var(--accent)" }}
                  aria-hidden="true"
                >
                  {area.icon}
                </span>
                <h3 className="text-base font-semibold mb-3" style={{ color: "var(--text)" }}>
                  {area.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ================================================
            FEATURED PROJECTS
        ================================================ */}
        <section
          aria-labelledby="projects-heading"
          className="max-w-5xl mx-auto px-6 py-20"
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="mono-label mb-2">selected work</p>
              <h2
                id="projects-heading"
                className="text-2xl font-bold"
                style={{ color: "var(--text)" }}
              >
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              id="view-all-projects"
              className="text-sm font-mono flex items-center gap-1 transition-opacity duration-200 hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              all projects
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <article
                key={project.slug}
                className="group relative p-6 rounded-xl border transition-all duration-300 glow-hover animate-fade-up cursor-default"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-alt)",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-mono"
                    style={{ color: project.status === "active" ? "var(--green)" : "var(--text-subtle)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: project.status === "active" ? "var(--green)" : "var(--text-subtle)",
                      }}
                      aria-hidden="true"
                    />
                    {project.status}
                  </span>
                  <span className="mono-label">{project.year}</span>
                </div>

                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                  {project.title}
                </h3>
                <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="transition-colors duration-200"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <GitBranch size={15} aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="transition-colors duration-200"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================================================
            LATEST WRITING
        ================================================ */}
        {posts.length > 0 && (
          <section
            aria-labelledby="blog-heading"
            className="max-w-5xl mx-auto px-6 py-20"
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="mono-label mb-2">thoughts & deep dives</p>
                <h2
                  id="blog-heading"
                  className="text-2xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  Latest Writing
                </h2>
              </div>
              <Link
                href="/blog"
                id="view-all-posts"
                className="text-sm font-mono flex items-center gap-1 transition-opacity duration-200 hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                all posts
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  id={`post-link-${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 border-t transition-all duration-200"
                  style={{
                    borderColor: "var(--border)",
                    borderBottom: i === posts.length - 1 ? `1px solid var(--border)` : undefined,
                  }}
                  aria-label={`Read: ${post.title}`}
                >
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-sm font-medium mb-1 truncate transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{ color: "var(--text)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="mono-label">{formatDate(post.date)}</span>
                    {post.readingTime && (
                      <span className="mono-label hidden sm:block">{post.readingTime}</span>
                    )}
                    <ArrowRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================================================
            CTA
        ================================================ */}
        <section
          aria-labelledby="cta-heading"
          className="max-w-5xl mx-auto px-6 py-24"
        >
          <div
            className="relative rounded-2xl p-10 md:p-16 text-center overflow-hidden"
            style={{
              background: "var(--bg-alt)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Glow behind */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: "radial-gradient(ellipse at 50% 100%, rgba(var(--accent-rgb), 0.12) 0%, transparent 60%)",
              }}
            />
            <p className="mono-label mb-4">let&apos;s work together</p>
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--text)" }}
            >
              Got something interesting?
            </h2>
            <p
              className="text-base mb-8 max-w-md mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              I'm always open to interesting conversations about AI systems,
              developer tooling, and building things that matter.
            </p>
            <Link
              href="/contact"
              id="cta-contact-link"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Get in touch
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
