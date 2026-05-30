import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { formatResumeText, formatDate } from '@/lib/utils';
import { EXPERIENCE } from '@/lib/experience';
import { siteConfig } from '@/lib/metadata';

import { HOME_CONTENT } from '@/lib/content';

export default function HomePage() {
  const MAXIMUM_RECENT_BLOGS = 3;
  const posts = getAllPosts()
    .filter((p) => !p.private)
    .slice(0, MAXIMUM_RECENT_BLOGS);

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
    <div className="max-w-xl mx-auto px-6 pt-28 pb-24 relative">
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
        <p className="text-sm text-text-muted">
          <strong className="font-light text-text">{HOME_CONTENT.heroSubtitle}</strong>
        </p>
      </header>

      {/* Wins */}
      <section aria-labelledby="wins-heading" className="mb-10 animate-fade-in-up stagger-2">
        <h2 id="wins-heading" className="section-label mb-4">
          {HOME_CONTENT.sectionWins}
        </h2>
        <ul>
          {HOME_CONTENT.wins.map(([metric, context]) => (
            <li
              key={metric}
              className="flex items-baseline justify-between gap-6 py-3 border-t border-border-subtle"
            >
              <span className="text-sm font-light text-text">{context}</span>
              <span className="text-sm font-semibold flex-shrink-0 text-text">{metric}</span>
            </li>
          ))}
        </ul>
        <div className="pt-4">
          <Link
            href="/projects"
            id="view-all-projects"
            className="group inline-flex items-center gap-1.5 text-xs font-mono py-1 px-3 rounded-full border border-border bg-surface hover:border-text-subtle hover:bg-surface-alt transition-all duration-200 blue-link"
          >
            <span className="blue-link-text">{HOME_CONTENT.viewProjects}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mb-10 animate-fade-in-up stagger-4">
        <h2 id="experience-heading" className="section-label mb-4">
          {HOME_CONTENT.sectionExperience}
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

      {/* Recent Writing */}
      {posts.length > 0 && (
        <section aria-labelledby="blog-heading" className="mb-10 animate-fade-in-up stagger-6">
          <h2 id="blog-heading" className="section-label mb-4">
            {HOME_CONTENT.sectionBlog}
          </h2>
          <div>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                id={`post-${post.slug}`}
                className="row-link group items-start flex-col sm:flex-row"
              >
                <div className="w-full sm:flex-1 min-w-0 pr-0 sm:pr-8 mb-1.5 sm:mb-0">
                  <span className="text-sm block text-text">
                    <span className="animated-underline">{post.title}</span>
                    <span className="row-link-arrow text-xs ml-1.5 inline-block">↗</span>
                  </span>
                </div>
                <div className="w-full sm:w-auto flex-shrink-0 pt-1 sm:pt-0.5">
                  <span className="mono-label">{formatDate(post.date)}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-4">
            <Link
              href="/blog"
              id="view-all-posts"
              className="group inline-flex items-center gap-1.5 text-xs font-mono py-1 px-3 rounded-full border border-border bg-surface hover:border-text-subtle hover:bg-surface-alt transition-all duration-200 blue-link"
            >
              <span className="blue-link-text">{HOME_CONTENT.viewAllPosts}</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
