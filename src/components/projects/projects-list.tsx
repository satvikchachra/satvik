import type { Project } from '@/lib/projects';
import { formatResumeText } from '@/lib/utils';
import { PROJECTS_CONTENT } from '@/lib/content';

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <>
      {/* Project rows */}
      {projects.length === 0 ? (
        <p className="text-sm text-text-muted">{PROJECTS_CONTENT.noProjectsFound}</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.slug} className="py-5 border-t border-border-subtle">
              {/* Title row */}
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h2 className="text-sm text-text">{project.title}</h2>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {project.status === 'active' && (
                    <span className="text-xs text-green">{PROJECTS_CONTENT.activeLabel}</span>
                  )}
                  <span className="mono-label">{project.year}</span>
                </div>
              </div>

              {/* Company & Live URL */}
              <div className="text-xs mb-3 flex items-center gap-2">
                {project.company && <span className="text-text-subtle">{project.company}</span>}
                {project.company && project.liveUrl && (
                  <span className="text-text-subtle" aria-hidden="true">
                    ·
                  </span>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blue-link inline-flex items-baseline gap-1"
                  >
                    <span className="blue-link-text">
                      {project.liveUrl
                        .replace('https://', '')
                        .replace('www.', '')
                        .replace(/\/$/, '')}
                    </span>
                    <span className="text-xs no-underline" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
              </div>

              {/* Short description */}
              <p className="text-sm leading-relaxed mb-4 text-text-muted">
                {formatResumeText(project.description)}
              </p>

              {/* Tech stack chips */}
              <div className="flex flex-wrap gap-1.5 mb-4 items-center">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              {project.bullets && project.bullets.length > 0 && (
                <ul className="space-y-2 pl-4">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-relaxed list-disc text-text-muted">
                      {formatResumeText(bullet)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
