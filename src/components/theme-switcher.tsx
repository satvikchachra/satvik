"use client";

import { useTheme } from "@/lib/theme";
import { useState, useRef, useEffect } from "react";

export function ThemeSwitcher() {
  const { theme, THEMES, THEME_LABELS, THEME_ICONS, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Current theme: ${THEME_LABELS[theme]}. Click to change theme.`}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-200"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-muted)",
          background: "var(--surface)",
        }}
      >
        <span aria-hidden="true">{THEME_ICONS[theme]}</span>
        <span className="hidden sm:inline">{THEME_LABELS[theme]}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select theme"
          className="absolute right-0 top-full mt-2 w-40 rounded-xl overflow-hidden shadow-2xl z-50"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t}
              role="option"
              aria-selected={theme === t}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-left transition-colors duration-150"
              style={{
                color: theme === t ? "var(--accent)" : "var(--text-muted)",
                background: theme === t ? "rgba(var(--accent-rgb), 0.08)" : "transparent",
              }}
            >
              <span aria-hidden="true">{THEME_ICONS[t]}</span>
              {THEME_LABELS[t]}
              {theme === t && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="ml-auto"
                  aria-hidden="true"
                >
                  <path
                    d="M2 5L4.5 7.5L8 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
