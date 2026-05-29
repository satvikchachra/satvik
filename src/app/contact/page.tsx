import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Satvik Chachra — open for interesting conversations about AI, developer tooling, and full stack engineering.',
  path: '/contact',
});

const LINKS = [
  {
    id: 'contact-github',
    href: 'https://github.com/satvikchachra',
    label: 'github',
    handle: 'satvikchachra',
    description: 'code, projects, contributions',
  },
  {
    id: 'contact-twitter',
    href: 'https://twitter.com/satvikchachra',
    label: 'twitter / x',
    handle: 'satvikchachra',
    description: 'thoughts, hot takes, building in public',
  },
  {
    id: 'contact-linkedin',
    href: 'https://linkedin.com/in/satvikchachra',
    label: 'linkedin',
    handle: 'satvikchachra',
    description: 'professional updates',
  },
  {
    id: 'contact-email',
    href: 'mailto:consultwithsatvik@gmail.com',
    label: 'email',
    handle: 'consultwithsatvik@gmail.com',
    description: 'best for longer conversations',
  },
] as const;

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">
      <header className="mb-8 animate-fade-in-up stagger-0">
        <h1 className="text-lg tracking-tight mb-2 text-text">get in touch</h1>
        <p className="text-sm leading-relaxed text-text-muted">
          Open to conversations about AI systems, developer tooling, something you&apos;re building,
          or a good engineering problem.
        </p>
      </header>

      <ul className="animate-fade-in-up stagger-1" aria-label="Contact links">
        {LINKS.map(({ id, href, label, handle, description }) => (
          <li key={id}>
            <a
              id={id}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={`${label}: ${handle}`}
              className="row-link group pr-2 items-start overflow-visible"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
                  <span className="text-sm font-medium text-text">
                    <span className="animated-underline">{label}</span>
                  </span>
                  {/* Mobile-only handle & separator — displayed adjacent to platform name */}
                  <span className="text-xs sm:hidden font-mono inline-flex items-baseline gap-1.5 text-accent">
                    <span className="text-text-subtle" aria-hidden="true">
                      ·
                    </span>
                    <span className="animated-underline">
                      {label === 'email' ? '' : '@'}
                      {handle}
                    </span>
                  </span>
                </div>
                <span className="text-xs block text-text-subtle">{description}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 pt-0.5">
                {/* Desktop-only handle */}
                <span className="text-xs hidden sm:block font-mono text-accent">
                  <span className="animated-underline">
                    {label === 'email' ? '' : '@'}
                    {handle}
                  </span>
                </span>
                <span className="row-link-arrow text-xs text-accent">↗</span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <p className="text-xs mt-10 text-text-subtle">usually responds within 48 hours.</p>
    </div>
  );
}
