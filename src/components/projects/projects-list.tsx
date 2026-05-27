"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";

interface ProjectsListProps {
  projects: Project[];
  allTags: string[];
}

export function ProjectsList({ projects, allTags }: ProjectsListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <>
      {/* Tag filter — minimal pill row */}
      <div
        className="flex flex-wrap gap-2 mb-8"
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
          {filtered.map((project) => (
            <div
              key={project.slug}
              className="py-5"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              {/* Title row */}
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h2 className="text-sm" style={{ color: "var(--text)" }}>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} — opens in new tab`}
                      className="transition-opacity duration-150 hover:opacity-70 inline-flex items-baseline gap-1"
                      style={{ color: "var(--text)" }}
                    >
                      {project.title}
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-subtle)" }}
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h2>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Only show "active" badge for the AI Coding Agent */}
                  {project.slug === "ai-coding-agent" && (
                    <span
                      className="text-xs"
                      style={{ color: "var(--green)" }}
                    >
                      active
                    </span>
                  )}
                  <span className="mono-label">{project.year}</span>
                </div>
              </div>

              {/* Company name */}
              {project.company && (
                <p className="text-xs mb-3" style={{ color: "var(--text-subtle)" }}>
                  {project.company}
                </p>
              )}

              {/* Short description */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {project.description}
              </p>

              {/* Tech stack — above bullets */}
              <p
                className="text-xs mb-3 tracking-wide"
                style={{ color: "var(--text-subtle)" }}
              >
                <span
                  className="uppercase"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    color: "var(--text-subtle)",
                    marginRight: "0.5rem",
                  }}
                >
                  tech stack
                </span>
                {project.tags.join(" · ")}
              </p>

              {/* Bullets */}
              {project.bullets && project.bullets.length > 0 && (
                <ul className="space-y-2" style={{ paddingLeft: "1rem" }}>
                  {project.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-xs leading-relaxed list-disc"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
