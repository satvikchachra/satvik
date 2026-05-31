import Link from 'next/link';
import { siteConfig } from '@/lib/metadata';

import { HOME_CONTENT } from '@/lib/content';
import { GitHubIcon, XIcon, LinkedInIcon, MailIcon } from '@/components/ui/icons';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-12 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Ambient glow */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Header */}
      <header className="mb-10 animate-fade-in-up stagger-0" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-lg tracking-tight mb-1 text-text">
          {HOME_CONTENT.heroTitle}
        </h1>
        <p className="text-sm text-text-muted mb-4">
          <strong className="font-light text-text">{HOME_CONTENT.heroSubtitle}</strong>
        </p>

        {/* Social Links */}
        <div className="flex gap-4 mt-5">
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
            <a
              key={href}
              href={href}
              aria-label={label}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-text-muted hover:text-text transition-colors duration-200"
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </header>

      {/* Wins */}
      <section aria-labelledby="wins-heading" className="mb-10 animate-fade-in-up stagger-2">
        <h2 id="wins-heading" className="section-label mb-4">
          {HOME_CONTENT.sectionWins}
        </h2>
        <ul className="space-y-3 list-disc pl-4 text-sm text-text-muted">
          {HOME_CONTENT.wins.map((win, idx) => (
            <li key={idx} className="leading-relaxed pl-1">
              {win.text}{' '}
              <strong className="font-medium text-text">{win.highlight}</strong>.
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Row */}
      <section aria-label="Quick links" className="mb-10 animate-fade-in-up stagger-4">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href="/projects"
            id="cta-work"
            className="group inline-flex items-baseline gap-1 text-xs blue-link"
          >
            <span className="blue-link-text">{HOME_CONTENT.ctaWork}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
          <Link
            href="/blog"
            id="cta-blog"
            className="group inline-flex items-baseline gap-1 text-xs blue-link"
          >
            <span className="blue-link-text">{HOME_CONTENT.ctaBlog}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
