import type { Metadata } from "next";
import { GitBranch, X, Link2, Mail, ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Satvik Chachra — open for interesting conversations about AI, developer tooling, and platform engineering.",
  path: "/contact",
});

const LINKS = [
  {
    id: "contact-github",
    href: "https://github.com/satvikchachra",
    icon: GitBranch,
    label: "GitHub",
    handle: "satvikchachra",
    description: "Code, projects, contributions",
  },
  {
    id: "contact-twitter",
    href: "https://twitter.com/satvikchachra",
    icon: X,
    label: "Twitter / X",
    handle: "@satvikchachra",
    description: "Thoughts, hot takes, building in public",
  },
  {
    id: "contact-linkedin",
    href: "https://linkedin.com/in/satvikchachra",
    icon: Link2,
    label: "LinkedIn",
    handle: "satvikchachra",
    description: "Professional updates",
  },
  {
    id: "contact-email",
    href: "mailto:hi@satvikchachra.com",
    icon: Mail,
    label: "Email",
    handle: "hi@satvikchachra.com",
    description: "Best for longer conversations",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <header className="mb-16">
        <p className="mono-label mb-4">reach out</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--text)" }}>
          Get in touch
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          I'm always open to interesting conversations — whether that's about
          AI systems, developer tooling, something you're building, or just a
          good engineering problem. Reach out through any of these:
        </p>
      </header>

      <ul className="space-y-3" role="list">
        {LINKS.map(({ id, href, icon: Icon, label, handle, description }) => (
          <li key={id}>
            <a
              id={id}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={`${label}: ${handle}`}
              className="group flex items-center justify-between gap-4 p-5 rounded-xl border transition-all duration-300 glow-hover"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-alt)",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[rgba(var(--accent-rgb),0.12)]"
                  style={{ background: "var(--surface)" }}
                  aria-hidden="true"
                >
                  <Icon
                    size={18}
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {label}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
                      {handle}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
                    {description}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="flex-shrink-0 transition-all duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: "var(--text-subtle)" }}
              />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs font-mono text-center" style={{ color: "var(--text-subtle)" }}>
        Usually responds within 48h.
      </p>
    </div>
  );
}
