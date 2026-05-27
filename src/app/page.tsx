import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const WINS = [
  ["2K+ users daily", "Built AI coding agent"],
  ["1 Million+ users", "B2C SaaS products shipped at AppyHigh"],
  ["~95% shared code", "VS Code + JetBrains plugin for AI Coding Agent"],
  ["60s → 500ms", "ML prediction API latency reduction"],
] as const;

const EXPERIENCE = [
  {
    year: "2025 – now",
    company: "Atlassian",
    companyUrl: "https://www.atlassian.com/",
    role: "SDE 2 — AI Foundations",
    description:
      "Building AI coding agents, developer tooling infrastructure, and intelligent systems used by over two thousand engineers daily (2K+). Led end-to-end development of an AI-native editor and chat experience across VS Code and JetBrains with ~95% shared code.",
  },
  {
    year: "2024 – 2025",
    company: "Atlassian",
    companyUrl: "https://www.atlassian.com/",
    role: "SDE 1 — Dev Infra",
    description:
      "Worked on ML-powered predictive test selection for CI/CD pipelines. Drove ~99% improvement in p95 prediction API latency (60s → 500ms) through Tecton feature store integration and Redis caching alongside FastAPI migration.",
  },
  {
    year: "2022 – 2023",
    company: "AppyHigh",
    companyUrl: "https://www.appyhigh.com/",
    role: "SDE 1 — Full Stack",
    description:
      "Built AI-powered photo editing and generation platform (PhotAI) and a cloud-based storage and document conversion service (ScannerGo). Led small engineering teams and shipped products that collectively served over one million users (1M+)",
  },
] as const;


export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24 relative">
      {/* Ambient glow */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Header */}
      <header
        className="mb-10 animate-fade-in-up stagger-0"
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
          builds ai coding agents, full stack software products &amp; infra
        </p>
      </header>

      {/* Wins */}
      <section aria-labelledby="wins-heading" className="mb-10 animate-fade-in-up stagger-2">
        <p className="section-label mb-4">selected wins</p>
        <div>
          {WINS.map(([metric, context]) => (
            <div
              key={metric}
              className="flex items-baseline justify-between gap-6 py-3"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                {context}
              </span>
              <span
                className="text-sm flex-shrink-0"
                style={{ color: "var(--text)" }}
              >
                {metric}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mb-10 animate-fade-in-up stagger-4">
        <p className="section-label mb-4">experience</p>
        <div>
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              className="py-4"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {item.role}
                </span>
                <time
                  dateTime={item.year}
                  className="mono-label flex-shrink-0"
                >
                  {item.year}
                </time>
              </div>
              <p className="text-xs mb-2">
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blue-link inline-flex items-baseline gap-1"
                >
                  <span className="blue-link-text">{item.company}</span>
                  <span className="text-xs no-underline" aria-hidden="true" style={{ textDecoration: "none" }}>↗</span>
                </a>
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Selected Work */}
      <section
        aria-labelledby="projects-heading"
        className="mb-10 animate-fade-in-up stagger-5"
      >
        <p className="section-label mb-4">selected work</p>
        <div className="py-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link
            href="/projects"
            id="view-all-projects"
            className="blue-link inline-flex items-baseline gap-1 text-sm font-medium"
          >
            <span className="blue-link-text">View all projects</span>
            <span className="text-xs no-underline" aria-hidden="true" style={{ textDecoration: "none" }}>↗</span>
          </Link>
        </div>
      </section>

      {/* Recent Writing */}
      {posts.length > 0 && (
        <section
          aria-labelledby="blog-heading"
          className="mb-10 animate-fade-in-up stagger-6"
        >
          <p className="section-label mb-4">recent writing</p>
          <div>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                id={`post-${post.slug}`}
                className="row-link group"
                aria-label={`Read: ${post.title}`}
                style={{ alignItems: "flex-start" }}
              >
                <div className="flex-1 min-w-0 pr-8">
                  <span
                    className="text-sm block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span className="animated-underline">{post.title}</span>
                  </span>
                </div>
                <div className="flex-shrink-0 pt-0.5">
                  <span className="mono-label">
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-3">
            <Link
              href="/blog"
              id="view-all-posts"
              className="text-xs inline-block link-subtle"
            >
              all posts →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
