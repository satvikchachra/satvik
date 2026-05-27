import type { Metadata } from "next";
import React from "react";
import { buildMetadata } from "@/lib/metadata";
import { formatResumeText } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Satvik Chachra — full stack engineer, SDE 2, building AI coding agents and developer tooling.",
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

const EXPERIENCE = [
  {
    year: "2025 – now",
    company: "Atlassian",
    companyUrl: "https://www.atlassian.com/",
    role: "SDE 2 — AI Foundations",
    description:
      "Building **AI coding agents**, developer tooling infrastructure, and intelligent systems used by **over two thousand engineers daily (2K+)**. __Led end-to-end development__ of an **AI-native editor and chat experience** across **VS Code and JetBrains** with **~95% shared code**.",
  },
  {
    year: "2024 – 2025",
    company: "Atlassian",
    companyUrl: "https://www.atlassian.com/",
    role: "SDE 1 — Dev Infra",
    description:
      "Worked on **ML-powered predictive test selection** for CI/CD pipelines. __Drove **~99% improvement** in **p95 prediction API latency (60s → 500ms)**__ through Tecton feature store integration, Redis caching, and **FastAPI migration**.",
  },
  {
    year: "2022 – 2023",
    company: "AppyHigh",
    companyUrl: "https://www.appyhigh.com/",
    role: "SDE 1 — Full Stack",
    description:
      "Built **AI-powered photo editing and generation platform (PhotAI)** and a cloud-based storage and document conversion service (ScannerGo). __Led small engineering teams__ and shipped products that collectively served **over one million users (1M+)**.",
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
    description: "For __building PhotAI's client-side canvas algorithm__—combining original images with B&W API masks and **manipulating pixel data in real time** to generate background-removed downloadable outputs.",
    viewUrl: "https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/brainiacAward.jpg",
  },
  {
    title: "Letter of Appreciation",
    date: "Jan ’23",
    description: "For __driving a **3x optimization** in web performance__ and load times across core consumer products, __recognized by startup founders__.",
    viewUrl: "https://github.com/satvikchachra/profile/blob/463aeb1d2ba5208a094842824d0cab7650f56b91/letterOfAppreciation.jpg",
  },
  {
    title: "Talent Star Award",
    date: "Sep ’22",
    description: "For __building ScannerGo__, developing **Socket-based real-time conversions**, custom browser PDF viewing, and **Redux architecture**.",
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
            {formatResumeText("**AI-native full stack engineer** with **4+ Years of Experience**. I am building **AI Coding Agents**, AI software products, **Developer Tooling**, and the **Infrastructure** that makes them production-ready.")}
          </p>
          <p>
            {formatResumeText("I write about **AI systems**, **platform engineering**, and things I'm learning across **Computer Science**, Mathematics, **Machine Learning**, Artificial Intelligence, and Physics.")}
          </p>
        </div>
      </header>

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

      {/* Stack */}
      <section aria-labelledby="stack-heading" className="mb-10 animate-fade-in-up stagger-3">
        <p className="section-label mb-4">tech stack</p>
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
        <p className="section-label mb-4">education</p>
        <div>
          {EDUCATION.map((item, i) => (
            <div
              key={i}
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
        <p className="section-label mb-4">awards / recognition</p>
        <div>
          {AWARDS.map((item, i) => (
            <div
              key={i}
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
