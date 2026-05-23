"use client";

import { useEffect, useState } from "react";

const THEMES = ["dark", "light"] as const;
type Theme = (typeof THEMES)[number];

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored && THEMES.includes(stored) ? stored : getSystemTheme();
    applyTheme(initial);
    setThemeState(initial);

    // Listen for system changes (only if no stored pref)
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const t = e.matches ? "dark" : "light";
        applyTheme(t);
        setThemeState(t);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
    setThemeState(next);
  };

  const setTheme = (t: Theme) => {
    applyTheme(t);
    localStorage.setItem("theme", t);
    setThemeState(t);
  };

  return { theme, toggleTheme, setTheme, isDark: theme === "dark" };
}
