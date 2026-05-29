import { GitHubIcon, XIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { CurrentYear } from "./current-year";

export function Footer() {

  return (
    <footer
      className="mt-24 border-t border-border-subtle"
    >
      <div className="max-w-xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Social links */}
        <nav aria-label="Social links">
          <ul className="flex items-center gap-4">
            {[
              { href: "https://github.com/satvikchachra", label: "GitHub", icon: GitHubIcon },
              { href: "https://twitter.com/satvikchachra", label: "X (Twitter)", icon: XIcon },
              { href: "https://linkedin.com/in/satvikchachra", label: "LinkedIn", icon: LinkedInIcon },
              { href: "mailto:hello@example.com", label: "Email", icon: MailIcon },
            ].map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="text-text-muted hover:text-text transition-colors duration-200 block"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p
          className="text-xs tracking-wide text-text-subtle"
        >
          &copy; <CurrentYear />
        </p>
      </div>
    </footer>
  );
}
