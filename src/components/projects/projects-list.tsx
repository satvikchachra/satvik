import type { Project } from "@/lib/projects";
import { formatResumeText } from "@/lib/utils";

interface ProjectsListProps {
  projects: Project[];
  allTags: string[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <>
      {/* Project rows */}
      {projects.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          no projects found.
        </p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li
              key={project.slug}
              className="py-5"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              {/* Title row */}
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h2 className="text-sm" style={{ color: "var(--text)" }}>
                  {project.title}
                </h2>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {project.status === "active" && (
                    <span className="text-xs" style={{ color: "var(--green)" }}>
                      active
                    </span>
                  )}
                  <span className="mono-label">{project.year}</span>
                </div>
              </div>

              {/* Company & Live URL */}
              <div className="text-xs mb-3 flex items-center gap-2">
                {project.company && (
                  <span style={{ color: "var(--text-subtle)" }}>
                    {project.company}
                  </span>
                )}
                {project.company && project.liveUrl && (
                  <span style={{ color: "var(--text-subtle)" }}>·</span>
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
                        .replace("https://", "")
                        .replace("www.", "")
                        .replace(/\/$/, "")}
                    </span>
                    <span
                      className="text-xs no-underline"
                      aria-hidden="true"
                      style={{ textDecoration: "none" }}
                    >
                      ↗
                    </span>
                  </a>
                )}
              </div>

              {/* Short description */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
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
                <ul className="space-y-2" style={{ paddingLeft: "1rem" }}>
                  {project.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed list-disc"
                      style={{ color: "var(--text-muted)" }}
                    >
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
