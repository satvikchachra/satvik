import type { RefObject } from "react";

interface FilterPanelProps {
  /** Unique id prefix used for aria wiring, e.g. "projects" or "blog" */
  id: string;
  /** Human-readable label on the toggle button, e.g. "filter by tech" */
  label: string;
  /** aria-label for the collapsible panel, e.g. "Filter projects by technology" */
  panelAriaLabel: string;
  allTags: string[];
  activeTags: Set<string>;
  activeCount: number;
  filterOpen: boolean;
  panelHeight: number;
  panelRef: RefObject<HTMLDivElement | null>;
  onToggleOpen: () => void;
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}

/**
 * Shared collapsible multi-select filter UI.
 * Renders the toggle button + inline active-pill row + animated panel.
 */
export function FilterPanel({
  id,
  label,
  panelAriaLabel,
  allTags,
  activeTags,
  activeCount,
  filterOpen,
  panelHeight,
  panelRef,
  onToggleOpen,
  onToggleTag,
  onClear,
}: FilterPanelProps) {
  return (
    <>
      {/* Toggle row */}
      <div className="flex items-center gap-3 mb-6">
        <button
          id={`${id}-filter-toggle`}
          onClick={onToggleOpen}
          aria-expanded={filterOpen}
          aria-controls={`${id}-filter-panel`}
          className="filter-toggle"
        >
          <span className="filter-toggle-icon" aria-hidden="true">
            {filterOpen ? "−" : "+"}
          </span>
          <span>{label}</span>
          {activeCount > 0 && (
            <span className="filter-badge" aria-label={`${activeCount} active`}>
              {activeCount}
            </span>
          )}
        </button>

        {/* Active pill preview — shown when panel is closed */}
        {!filterOpen && activeCount > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {Array.from(activeTags).map((tag) => (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className="filter-active-pill"
                aria-label={`Remove filter: ${tag}`}
              >
                {tag} ×
              </button>
            ))}
            <button
              onClick={onClear}
              className="filter-clear-btn"
              aria-label="Clear all filters"
            >
              clear
            </button>
          </div>
        )}
      </div>

      {/* Collapsible tag panel */}
      <div
        id={`${id}-filter-panel`}
        ref={panelRef}
        role="group"
        aria-label={panelAriaLabel}
        style={{
          maxHeight: filterOpen ? `${panelHeight}px` : "0px",
          opacity: filterOpen ? 1 : 0,
          overflow: "hidden",
          transition:
            "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
          marginBottom: filterOpen ? "1.5rem" : "0",
        }}
      >
        <div className="flex flex-wrap gap-2 pt-1 pb-3">
          {allTags.map((tag) => {
            const isActive = activeTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                aria-pressed={isActive}
                className={`tag cursor-pointer transition-all duration-150 ${isActive ? "tag-active" : ""}`}
              >
                {tag}
              </button>
            );
          })}
          {activeCount > 0 && (
            <button onClick={onClear} className="filter-clear-btn">
              clear all
            </button>
          )}
        </div>
      </div>
    </>
  );
}
