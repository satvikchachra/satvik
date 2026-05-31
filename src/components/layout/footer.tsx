import { GitHubIcon, XIcon, LinkedInIcon, MailIcon } from '@/components/ui/icons';
import { FOOTER_CONTENT } from '@/lib/content';

export function Footer() {
  return (
    <footer className="mt-0 border-t border-border-subtle">
      <div className="max-w-xl mx-auto p-6 flex items-center justify-between">
        {/* Social links */}
        <nav aria-label="Social links">
          <ul className="flex items-center gap-4">
            {[
              { href: 'https://github.com/satvikchachra', label: 'GitHub', icon: GitHubIcon },
              { href: 'https://twitter.com/satvikchachra', label: 'X (Twitter)', icon: XIcon },
              {
                href: 'https://linkedin.com/in/satvikchachra',
                label: 'LinkedIn',
                icon: LinkedInIcon,
              },
              { href: 'mailto:consultwithsatvik@gmail.com', label: 'Email', icon: MailIcon },
            ].map(({ href, label, icon: Icon }) => (
              <li key={href}>
                {href.startsWith('mailto') ? (
                  <a
                    href={href}
                    aria-label={label}
                    className="text-text-muted hover:text-text transition-colors duration-200 block"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-muted hover:text-text transition-colors duration-200 block"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs tracking-wide text-text-subtle">{FOOTER_CONTENT.license}</p>
      </div>
    </footer>
  );
}
