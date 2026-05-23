"use client";

import { useEffect, useState } from "react";

const THEMES = ["catppuccin", "nord", "gruvbox", "ayu"] as const;
type Theme = (typeof THEMES)[number];

const THEME_LABELS: Record<Theme, string> = {
  catppuccin: "Catppuccin",
  nord: "Nord",
  gruvbox: "Gruvbox",
  ayu: "Ayu",
};

const THEME_ICONS: Record<Theme, string> = {
  catppuccin: "🌸",
  nord: "❄️",
  gruvbox: "🔥",
  ayu: "⚡",
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("catppuccin");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && THEMES.includes(stored)) {
      applyTheme(stored);
      setTheme(stored);
    }
  }, []);

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next);
    setTheme(next);
  };

  const setThemeExplicit = (t: Theme) => {
    applyTheme(t);
    setTheme(t);
  };

  return { theme, cycleTheme, setTheme: setThemeExplicit, THEMES, THEME_LABELS, THEME_ICONS };
}
