import type { Metadata } from "next";
import React from "react";
import { buildMetadata } from "@/lib/metadata";
import { formatResumeText } from "@/lib/utils";
import { EXPERIENCE } from "@/lib/experience";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Satvik Chachra — full stack engineer, SDE 2, building AI coding agents, full stack software products and developer tooling.",
  path: "/about",
});

const STACK = [
  {
    category: "AI / ML",
    items: ["AI Agents", "LLMs", "RAG (learning)", "Tecton", "MLOps", "MCP", "ACP"],
  },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Rust (learning)"],
  },
  {
    category: "Frontend",
    items: ["ReactJS", "NextJS", "Redux", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["NodeJS", "FastAPI", "Flask", "Redis", "Firebase", "Socket.IO"],
  },
  {
    category: "Cloud / Infra",
    items: ["AWS S3", "CI/CD", "Docker"],
  },
  {
    category: "Tools / APIs",
    items: ["VS Code APIs", "JetBrains APIs", "AI SDK", "Stripe", "Material UI"],
  },
] as const;


const EDUCATION = [
  {
    year: "2018 – 2022",
    school: "Chitkara University",
    schoolUrl: "https://www.chitkara.edu.in/",
    degree: "Bachelor of Engineering, Computer Science",
    description: "CGPA: **9.83 / 10**",
  },
  {
    year: "2018",
    school: "CBSE Board",
    degree: "Senior Secondary Examination (12th)",
    description: "Percentage: **92.8%**",
  },
] as const;

const AWARDS = [
  {
    title: "Brainiac Award",
    date: "Feb ’23",
    description: "For building PhotAI's **Image Background Remover Tool**, __writing client-side canvas algorithm__ — combining original images with B&W API masks and pixel manipulation.",
    viewUrl: "https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/brainiacAward.jpg",
  },
  {
    title: "Letter of Appreciation",
    date: "Jan ’23",
    description: "For __driving **3x improvement** in performance__, and improving core Web Vitals like LCP, INP, and CLS, by code-splitting, caching, etc. Got recognition from startup founders",
    viewUrl: "https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/letterOfAppreciation.jpg",
  },
  {
    title: "Talent Star Award",
    date: "Sep ’22",
    description: "For __building ScannerGo's__ **Redux architecture**, Socket-based **real-time file conversions** and custom browser PDF viewing experience.",
    viewUrl: "https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/talentStarsAward.jpg",
  },
] as const;


export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">

      {/* Header */}
      <header className="mb-10 animate-fade-in-up stagger-0">
        <h1
          className="text-lg tracking-tight mb-3"
          style={{ color: "var(--text)" }}
        >
          satvik chachra
        </h1>
        <div className="text-sm leading-relaxed space-y-2" style={{ color: "var(--text-muted)" }}>
          <p>
            {formatResumeText("**AI-native full stack engineer**, __4+ years of experience__.")}
          </p>
          <p>
            {formatResumeText("Building **AI coding agents**, developer tooling, and the infrastructure that makes them production-ready.")}
          </p>
          <p>
            {formatResumeText("I write about AI systems, platform engineering, and things I'm learning across computer science, mathematics, and machine learning.")}
          </p>
        </div>
      </header>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mb-10 animate-fade-in-up stagger-4">
        <h2 id="experience-heading" className="section-label mb-4">experience</h2>
        <div>
          {EXPERIENCE.map((item) => (
            <div
              key={item.company + item.year}
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

      {/* Stack */}
      <section aria-labelledby="stack-heading" className="mb-10 animate-fade-in-up stagger-3">
        <h2 id="stack-heading" className="section-label mb-4">tech stack</h2>
        <div className="space-y-0">
          {STACK.map(({ category, items }) => (
            <div key={category} className="flex flex-col sm:flex-row sm:gap-6 py-2.5 border-t border-[var(--border-subtle)] first:border-t-0">
              <div
                className="w-28 flex-shrink-0 text-xs font-semibold tracking-wider uppercase mb-2 sm:mb-0 pt-1"
                style={{ color: "var(--text-subtle)" }}
              >
                {category}
              </div>
              <div className="flex-1 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="chip px-2.5 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="mb-10 animate-fade-in-up stagger-4">
        <h2 id="education-heading" className="section-label mb-4">education</h2>
        <div>
          {EDUCATION.map((item) => (
            <div
              key={item.school + item.year}
              className="py-4"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {item.degree}
                </span>
                <time
                  dateTime={item.year}
                  className="mono-label flex-shrink-0"
                >
                  {item.year}
                </time>
              </div>
              <p className="text-xs mb-2">
                {"schoolUrl" in item && item.schoolUrl ? (
                  <a
                    href={item.schoolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blue-link inline-flex items-baseline gap-1"
                  >
                    <span className="blue-link-text">{item.school}</span>
                    <span className="text-xs no-underline" aria-hidden="true" style={{ textDecoration: "none" }}>↗</span>
                  </a>
                ) : (
                  <span style={{ color: "var(--text)" }}>{item.school}</span>
                )}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {formatResumeText(item.description)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section aria-labelledby="awards-heading" className="mb-10 animate-fade-in-up stagger-4">
        <h2 id="awards-heading" className="section-label mb-4">awards / recognition</h2>
        <div>
          {AWARDS.map((item) => (
            <div
              key={item.title}
              className="py-4"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {item.title}
                </span>
                <span className="mono-label flex-shrink-0">
                  {item.date}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
                {formatResumeText(item.description)}
              </p>
              <p className="text-xs">
                <a
                  href={item.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blue-link inline-flex items-baseline gap-1"
                >
                  <span className="blue-link-text">View</span>
                  <span className="text-xs no-underline" aria-hidden="true" style={{ textDecoration: "none" }}>↗</span>
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
