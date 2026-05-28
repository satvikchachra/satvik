import { useState, useRef, useEffect } from "react";

export interface UseFilterPanelReturn {
  activeTags: Set<string>;
  filterOpen: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  panelHeight: number;
  activeCount: number;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Manages multi-select tag filter state and the collapsible panel height
 * measurement. Shared between ProjectsList and BlogList.
 */
export function useFilterPanel(allTags: string[]): UseFilterPanelReturn {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);

  // Re-measure whenever the panel opens/closes or the tag list changes
  useEffect(() => {
    if (panelRef.current) {
      setPanelHeight(panelRef.current.scrollHeight);
    }
  }, [filterOpen, allTags]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearFilters = () => setActiveTags(new Set());

  return {
    activeTags,
    filterOpen,
    panelRef,
    panelHeight,
    activeCount: activeTags.size,
    toggleTag,
    clearFilters,
    setFilterOpen,
  };
}
