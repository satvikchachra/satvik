import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { getAllPosts, formatDate } from "@/lib/blog";
import { siteConfig } from "@/lib/metadata";
import { formatResumeText } from "@/lib/utils";

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

interface ExperienceItem {
  readonly year: string;
  readonly company: string;
  readonly companyUrl: string;
  readonly role: string;
  readonly description: string;
}

const EXPERIENCE: readonly ExperienceItem[] = [
  {
    year: "2025 – now",
    company: "Atlassian",
    companyUrl: "https://www.atlassian.com/",
    role: "SDE 2 — AI Foundations",
    description:
      "Building **AI coding agents**, developer tooling infrastructure, and intelligent systems used by over two thousand engineers daily (**2K+**). __Led end-to-end development__ of an AI-native editor and chat experience across VS Code and JetBrains with **~95% shared code**.",
  },
  {
    year: "2024 – 2025",
    company: "Atlassian",
    companyUrl: "https://www.atlassian.com/",
    role: "SDE 1 — Dev Infra",
    description:
      "Worked on ML-powered predictive test selection for CI/CD pipelines. __Drove a **~99% improvement** in p95 prediction API latency (**60s → 500ms**)__ through Tecton feature store integration, Redis caching, and **FastAPI** migration.",
  },
  {
    year: "2022 – 2023",
    company: "AppyHigh",
    companyUrl: "https://www.appyhigh.com/",
    role: "SDE 1 — Full Stack",
    description:
      "Built AI-powered photo editing and generation platform (PhotAI) and a cloud-based storage and document conversion service (ScannerGo). __Led small engineering teams__ and shipped products that served over One Million Users (**1M+**).",
  },
];


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
          builds{" "}
          <strong className="font-semibold text-[var(--text)]">
            ai coding agents
          </strong>
          ,{" "}
          <strong className="font-semibold text-[var(--text)]">
            full stack software products
          </strong>{" "}
          &amp; infra
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
                className="text-sm font-semibold flex-shrink-0"
                style={{ color: "var(--text)" }}
              >
                {metric}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <Link
            href="/projects"
            id="view-all-projects"
            className="group inline-flex items-center gap-1.5 text-xs font-mono py-1 px-3 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text-subtle)] hover:bg-[var(--surface-alt)] transition-all duration-200 blue-link"
          >
            <span className="blue-link-text">view projects</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
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
                {formatResumeText(item.description)}
              </p>
            </div>
          ))}
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
                    style={{ color: "var(--text)" }}
                  >
                    <span className="animated-underline">{post.title}</span>
                    <span className="row-link-arrow text-xs ml-1.5 inline-block">↗</span>
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
          <div className="pt-4">
            <Link
              href="/blog"
              id="view-all-posts"
              className="group inline-flex items-center gap-1.5 text-xs font-mono py-1 px-3 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text-subtle)] hover:bg-[var(--surface-alt)] transition-all duration-200 blue-link"
            >
              <span className="blue-link-text">all posts</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
