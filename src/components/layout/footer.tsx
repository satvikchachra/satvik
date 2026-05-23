import Link from "next/link";
import { GitBranch, X, Link2, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { href: "https://github.com/satvikchachra",      icon: GitBranch, label: "GitHub"   },
  { href: "https://twitter.com/satvikchachra",     icon: X,         label: "Twitter"  },
  { href: "https://linkedin.com/in/satvikchachra", icon: Link2,     label: "LinkedIn" },
  { href: "mailto:hi@satvikchachra.com",           icon: Mail,      label: "Email"    },
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
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="ui-sans transition-opacity duration-150 hover:opacity-60"
                style={{ color: "var(--text-subtle)" }}
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Right: nav */}
          <nav aria-label="Footer navigation">
            <ul className="ui-sans flex flex-wrap gap-x-5 gap-y-1" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="ui-sans text-xs transition-opacity duration-150 hover:opacity-60"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          className="ui-sans text-xs mt-8"
          style={{ color: "var(--text-subtle)" }}
        >
          © {year} Satvik Chachra
        </p>
      </div>
    </footer>
  );
}
