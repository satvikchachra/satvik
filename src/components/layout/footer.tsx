import Link from "next/link";
import { GitBranch, X, Link2, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { href: "https://github.com/satvikchachra",         icon: GitBranch, label: "GitHub"   },
  { href: "https://twitter.com/satvikchachra",        icon: X,       label: "Twitter"  },
  { href: "https://linkedin.com/in/satvikchachra",    icon: Link2,   label: "LinkedIn" },
  { href: "mailto:hi@satvikchachra.com",              icon: Mail,    label: "Email"    },
];

const NAV_LINKS = [
  { href: "/about",    label: "About"    },
  { href: "/projects", label: "Projects" },
  { href: "/blog",     label: "Blog"     },
  { href: "/contact",  label: "Contact"  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      className="border-t mt-24"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left: brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href="/"
              className="font-mono text-sm font-semibold"
              style={{ color: "var(--accent)" }}
              aria-label="Satvik Chachra — Home"
            >
              satvik@chachra
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>
              AI-native platform engineer. Building agents, developer tooling,
              and intelligent systems.
            </p>
          </div>

          {/* Right: nav + socials */}
          <div className="flex flex-col gap-6">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="mono-label transition-colors duration-200 hover:text-[var(--accent)]"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="transition-colors duration-200 hover:text-[var(--accent)]"
                  style={{ color: "var(--text-subtle)" }}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderColor: "var(--border)" }}>
          <p className="font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
            © {year} Satvik Chachra
          </p>
          <p className="font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
            Built with Next.js + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
