"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";

interface ProjectsListProps {
  projects: Project[];
  allTags: string[];
}

const STATUS_LABEL: Record<Project["status"], string> = {
  active:   "active",
  wip:      "wip",
  archived: "archived",
};

const STATUS_COLORS: Record<Project["status"], string> = {
  active:   "var(--green)",
  wip:      "var(--yellow)",
  archived: "var(--text-subtle)",
};

export function ProjectsList({ projects, allTags }: ProjectsListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <>
      {/* Tag filter — minimal pill row */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="group"
        aria-label="Filter projects by tag"
      >
        <button
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={`tag transition-all duration-150 ${activeTag === null ? "tag-active" : ""}`}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            aria-pressed={activeTag === tag}
            className={`tag transition-all duration-150 ${activeTag === tag ? "tag-active" : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project rows */}
      {filtered.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          no projects match that filter.
        </p>
      ) : (
        <div>
          {filtered.map((project, i) => (
            <div
              key={project.slug}
              className="py-5"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              {/* Title row */}
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2
                  className="text-sm"
                  style={{ color: "var(--text)" }}
                >
                  {project.title}
                </h2>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="text-xs"
                    style={{ color: STATUS_COLORS[project.status] }}
                  >
                    {STATUS_LABEL[project.status]}
                  </span>
                  <span className="mono-label">{project.year}</span>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                {project.description}
              </p>

              {/* Tags + links on same row */}
              <div className="flex items-center justify-between gap-4">
                <p
                  className="text-xs"
                  style={{ color: "var(--text-subtle)" }}
                >
                  {project.tags.join(" · ")}
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="text-xs transition-colors duration-200"
                      style={{ color: "var(--text-subtle)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-subtle)")
                      }
                    >
                      gh ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="text-xs transition-colors duration-200"
                      style={{ color: "var(--text-subtle)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-subtle)")
                      }
                    >
                      live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
