import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Satvik Chachra — AI-native platform engineer, SDE 2, building AI coding agents and developer tooling.",
  path: "/about",
});

const STACK = [
  { category: "AI / ML",        items: ["LLMs", "RAG", "Agents", "LangChain", "OpenAI", "Gemini"] },
  { category: "Languages",       items: ["TypeScript", "Python", "Go", "Rust (learning)"] },
  { category: "Frontend",        items: ["React", "Next.js", "Tailwind", "shadcn/ui"] },
  { category: "Backend",         items: ["Node.js", "FastAPI", "PostgreSQL", "Redis"] },
  { category: "Infrastructure",  items: ["Docker", "Kubernetes", "GCP", "Terraform"] },
  { category: "Observability",   items: ["OpenTelemetry", "Prometheus", "Grafana"] },
] as const;

const TIMELINE = [
  {
    year: "2024 – now",
    role: "SDE 2 — AI-Native Platform Engineering",
    org: "Current Role",
    description:
      "Building AI coding agents, developer tooling infrastructure, and intelligent systems used by 2K+ engineers daily.",
  },
  {
    year: "2022 – 2024",
    role: "SDE 1 — Full Stack Engineering",
    org: "Previous Role",
    description:
      "Built and scaled full-stack features across web platforms. First forays into LLM integration and developer tooling.",
  },
  {
    year: "2018 – 2022",
    role: "B.Tech Computer Science",
    org: "University",
    description:
      "Deep dives into algorithms, distributed systems, and machine learning foundations.",
  },
] as const;

const WINS = [
  ["2K+ engineers daily",     "AI coding agent used in production"],
  ["1M+ users",               "B2C SaaS products shipped"],
  ["~95% shared code",        "VS Code + JetBrains plugin for AI agent"],
  ["60s → 500ms",             "ML prediction API latency reduction"],
  ["end-to-end",              "AI Coding Agent Native Chat Interface"],
] as const;

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">

      {/* Header */}
      <header className="mb-16 animate-fade-in-up stagger-0">
        <h1
          className="text-lg tracking-tight mb-2"
          style={{ color: "var(--text)" }}
        >
          satvik chachra
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          AI-native platform engineer. Building systems where AI writes code,
          reviews code, and understands codebases — and the infrastructure
          that makes that reliable.
        </p>
      </header>

      {/* Bio */}
      <section aria-labelledby="bio-heading" className="mb-16 animate-fade-in-up stagger-1">
        <p className="section-label mb-5">background</p>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          <p>
            I&apos;m a software engineer obsessed with the intersection of AI and
            developer experience. My work lives in the space between language
            models and production systems — making agents that actually work,
            not just demo well.
          </p>
          <p>
            Before AI became a buzzword, I was doing full-stack platform
            engineering. That background shapes how I think: I care deeply
            about reliability, latency, and what happens when your clever
            system meets real traffic at 3am.
          </p>
          <p>
            Outside of building, I write about AI systems, platform
            engineering patterns, and things I&apos;m learning across CS,
            mathematics, and science.
          </p>
        </div>
      </section>

      {/* Wins */}
      <section aria-labelledby="wins-heading" className="mb-16 animate-fade-in-up stagger-2">
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

      {/* Stack */}
      <section aria-labelledby="stack-heading" className="mb-16 animate-fade-in-up stagger-3">
        <p className="section-label mb-5">stack</p>
        <dl className="space-y-5">
          {STACK.map(({ category, items }) => (
            <div key={category} className="flex gap-6">
              <dt
                className="w-28 flex-shrink-0 text-xs pt-0.5 tracking-wide"
                style={{ color: "var(--text-subtle)" }}
              >
                {category.toLowerCase()}
              </dt>
              <dd
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading" className="mb-16 animate-fade-in-up stagger-4">
        <p className="section-label mb-4">timeline</p>
        <div>
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className="py-5"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
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
              <p className="text-xs mb-2" style={{ color: "var(--accent)" }}>
                {item.org}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="animate-fade-in-up stagger-5">
        <p className="section-label mb-4">principles</p>
        <div>
          {[
            ["ship fast, refactor faster", "Velocity matters. But so does the codebase you're leaving behind for future-you."],
            ["systems > hacks", "I'd rather spend 2x longer on a proper abstraction than ship a clever one-liner that breaks at 2x scale."],
            ["observability is not optional", "If you can't measure it in production, you don't understand it."],
            ["AI is a force multiplier", "The best AI systems make engineers dramatically more capable, not obsolete."],
          ].map(([title, body]) => (
            <div
              key={title}
              className="py-5"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <p className="text-sm mb-2" style={{ color: "var(--text)" }}>
                {title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
