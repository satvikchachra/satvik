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
    year: "2024 – Present",
    role: "SDE 2 — AI-Native Platform Engineering",
    org: "Current Role",
    description:
      "Building AI coding agents, developer tooling infrastructure, and intelligent systems. Leading platform architecture decisions and shipping production-grade agentic systems.",
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

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      {/* Header */}
      <header className="mb-16">
        <h1
          className="text-4xl md:text-5xl font-semibold mb-6 leading-tight"
          style={{ color: "var(--text)" }}
        >
          Satvik Chachra
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          AI-native full-stack platform engineer. I spend my days building
          systems where AI writes code, reviews code, and understands
          codebases — and the infrastructure that makes that reliable.
        </p>
      </header>

      <hr className="divider mb-16" />

      {/* Bio */}
      <section aria-labelledby="bio-heading" className="mb-16">
        <h2
          id="bio-heading"
          className="text-base font-semibold mb-5"
          style={{ color: "var(--text)" }}
        >
          Background
        </h2>
        <div className="space-y-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
            mathematics, and science. Some posts are opinion pieces, some are
            interactive deep dives. I like making things concrete and visual.
          </p>
        </div>
      </section>

      <hr className="divider mb-16" />

      {/* Stack */}
      <section aria-labelledby="stack-heading" className="mb-16">
        <h2
          id="stack-heading"
          className="text-base font-semibold mb-8"
          style={{ color: "var(--text)" }}
        >
          Stack
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {STACK.map(({ category, items }) => (
            <div key={category}>
              <dt
                className="ui-sans text-xs font-medium mb-3 uppercase tracking-wider"
                style={{ color: "var(--text-subtle)" }}
              >
                {category}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5" role="list">
                  {items.map((item) => (
                    <li key={item} className="tag">{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <hr className="divider mb-16" />

      {/* Timeline */}
      <section aria-labelledby="timeline-heading" className="mb-16">
        <h2
          id="timeline-heading"
          className="text-base font-semibold mb-8"
          style={{ color: "var(--text)" }}
        >
          Timeline
        </h2>
        <ol className="relative space-y-10" role="list">
          <div
            className="absolute left-[5px] top-2 bottom-2 w-px"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          {TIMELINE.map((item, i) => (
            <li key={i} className="relative pl-8">
              {/* Dot */}
              <div
                className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2"
                aria-hidden="true"
                style={{
                  background: i === 0 ? "var(--accent)" : "var(--bg)",
                  borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                }}
              />
              <time
                dateTime={item.year}
                className="mono-label block mb-1.5"
              >
                {item.year}
              </time>
              <h3
                className="text-sm font-semibold mb-0.5"
                style={{ color: "var(--text)" }}
              >
                {item.role}
              </h3>
              <p
                className="ui-sans text-xs mb-2 font-medium"
                style={{ color: "var(--accent)" }}
              >
                {item.org}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <hr className="divider mb-16" />

      {/* Engineering Principles */}
      <section aria-labelledby="principles-heading">
        <h2
          id="principles-heading"
          className="text-base font-semibold mb-8"
          style={{ color: "var(--text)" }}
        >
          Engineering Principles
        </h2>
        <ul className="space-y-6" role="list">
          {[
            ["Ship fast, refactor faster", "Velocity matters. But so does the codebase you're leaving behind for future-you."],
            ["Systems > hacks", "I'd rather spend 2x longer on a proper abstraction than ship a clever one-liner that breaks at 2x scale."],
            ["Observability is not optional", "If you can't measure it in production, you don't understand it."],
            ["AI is a force multiplier", "The best AI systems make engineers dramatically more capable, not obsolete."],
          ].map(([title, body]) => (
            <li key={title}>
              <strong
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--text)" }}
              >
                {title}
              </strong>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
