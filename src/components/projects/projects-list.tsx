"use client";

import { useState } from "react";
import { GitBranch, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectsListProps {
  projects: Project[];
  allTags: string[];
}

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
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by tag">
        <button
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className="tag transition-all duration-200"
          style={{
            background: activeTag === null ? "rgba(var(--accent-rgb), 0.18)" : undefined,
            color: activeTag === null ? "var(--accent)" : "var(--text-subtle)",
            borderColor: activeTag === null ? "var(--accent)" : undefined,
          }}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            aria-pressed={activeTag === tag}
            className="tag transition-all duration-200"
            style={{
              background: activeTag === tag ? "rgba(var(--accent-rgb), 0.18)" : undefined,
              color: activeTag === tag ? "var(--accent)" : "var(--text-subtle)",
              borderColor: activeTag === tag ? "var(--accent)" : undefined,
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          No projects match that filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project) => (
            <article
              key={project.slug}
              className="group relative p-6 rounded-xl border transition-all duration-300 glow-hover"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-alt)",
              }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-sm font-semibold mb-0.5 truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-mono"
                      style={{ color: STATUS_COLORS[project.status] }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: STATUS_COLORS[project.status] }}
                        aria-hidden="true"
                      />
                      {project.status}
                    </span>
                    <span className="mono-label">{project.year}</span>
                  </div>
                </div>
                {/* External links */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="transition-colors duration-200 hover:text-[var(--accent)]"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <GitBranch size={15} aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="transition-colors duration-200 hover:text-[var(--accent)]"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
