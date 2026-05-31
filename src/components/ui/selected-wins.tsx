import Link from 'next/link';
import { HOME_CONTENT, ABOUT_CONTENT } from '@/lib/content';

export function SelectedWins({ showViewProjects = true }: { showViewProjects?: boolean }) {
  return (
    <section aria-labelledby="wins-heading" className="mb-10 animate-fade-in-up stagger-2">
      <h2 id="wins-heading" className="section-label mb-4">
        {HOME_CONTENT.sectionWins}
      </h2>
      <ul>
        {ABOUT_CONTENT.wins.map(([metric, context]) => (
          <li
            key={metric}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6 py-3 sm:py-1.5 border-t border-border-subtle"
          >
            <span className="text-sm font-light text-text">{context}</span>
            <span className="text-sm font-semibold sm:flex-shrink-0 text-text">{metric}</span>
          </li>
        ))}
      </ul>
      {showViewProjects && (
        <div className="pt-4">
          <Link
            href="/projects"
            id="view-all-projects"
            className="group inline-flex items-baseline gap-1 text-xs blue-link"
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
      )}
    </section>
  );
}
