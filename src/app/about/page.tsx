import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { formatResumeText } from '@/lib/utils';
import { EXPERIENCE } from '@/lib/experience';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Learn about Satvik Chachra — full stack engineer, SDE 2, building AI coding agents, full stack software products and developer tooling.',
  path: '/about',
});

import { ABOUT_CONTENT } from '@/lib/content';

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24">
      {/* Header */}
      <header className="mb-10 animate-fade-in-up stagger-0">
        <h1 className="text-lg tracking-tight mb-3 text-text">{ABOUT_CONTENT.heroTitle}</h1>
        <div className="text-sm leading-relaxed space-y-2 text-text-muted">
          <p>{formatResumeText(ABOUT_CONTENT.introParagraph1)}</p>
          <p>{formatResumeText(ABOUT_CONTENT.introParagraph2)}</p>
          <p>{formatResumeText(ABOUT_CONTENT.introParagraph3)}</p>
        </div>
      </header>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mb-10 animate-fade-in-up stagger-4">
        <h2 id="experience-heading" className="section-label mb-4">
          {ABOUT_CONTENT.sectionExperience}
        </h2>
        <ul>
          {EXPERIENCE.map((item) => (
            <li key={item.company + item.year} className="py-4 border-t border-border-subtle">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="text-sm text-text">{item.role}</span>
                <span className="mono-label flex-shrink-0">{item.year}</span>
              </div>
              <p className="text-xs mb-2">
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blue-link inline-flex items-baseline gap-1"
                >
                  <span className="blue-link-text">{item.company}</span>
                  <span className="text-xs no-underline" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {formatResumeText(item.description)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section aria-labelledby="stack-heading" className="mb-10 animate-fade-in-up stagger-3">
        <h2 id="stack-heading" className="section-label mb-4">
          {ABOUT_CONTENT.sectionStack}
        </h2>
        <div className="space-y-0">
          {ABOUT_CONTENT.stack.map(({ category, items }) => (
            <div
              key={category}
              className="flex flex-col sm:flex-row sm:gap-6 py-2.5 border-t border-border-subtle first:border-t-0"
            >
              <div className="w-28 flex-shrink-0 text-xs font-semibold tracking-wider uppercase mb-2 sm:mb-0 pt-1 text-text-subtle">
                {category}
              </div>
              <div className="flex-1 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="chip px-2.5 py-1 text-xs">
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
        <h2 id="education-heading" className="section-label mb-4">
          {ABOUT_CONTENT.sectionEducation}
        </h2>
        <ul>
          {ABOUT_CONTENT.education.map((item) => (
            <li key={item.school + item.year} className="py-4 border-t border-border-subtle">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="text-sm text-text">{item.degree}</span>
                <span className="mono-label flex-shrink-0">{item.year}</span>
              </div>
              <p className="text-xs mb-2">
                {'schoolUrl' in item && item.schoolUrl ? (
                  <a
                    href={item.schoolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blue-link inline-flex items-baseline gap-1"
                  >
                    <span className="blue-link-text">{item.school}</span>
                    <span className="text-xs no-underline" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className="text-text">{item.school}</span>
                )}
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {formatResumeText(item.description)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Awards & Recognition */}
      <section aria-labelledby="awards-heading" className="mb-10 animate-fade-in-up stagger-4">
        <h2 id="awards-heading" className="section-label mb-4">
          {ABOUT_CONTENT.sectionAwards}
        </h2>
        <ul>
          {ABOUT_CONTENT.awards.map((item) => (
            <li key={item.title} className="py-4 border-t border-border-subtle">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="text-sm text-text">{item.title}</span>
                <span className="mono-label flex-shrink-0">{item.date}</span>
              </div>
              <p className="text-sm leading-relaxed mb-2 text-text-muted">
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
                  <span className="text-xs no-underline" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
