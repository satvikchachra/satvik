"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const NAV_LINKS = [
  { href: "/",         label: "home" },
  { href: "/about",    label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blog",     label: "blog" },
  { href: "/contact",  label: "contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile nav on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(var(--bg-alt, 24 24 37), 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between"
        >
          {/* Logo / Name */}
          <Link
            href="/"
            aria-label="Satvik Chachra — Home"
            className="font-mono text-sm font-semibold tracking-tight transition-opacity duration-200 hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            satvik<span style={{ color: "var(--text-subtle)" }}>@chachra</span>
            <span className="cursor" aria-hidden="true" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6" role="list">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className="mono-label transition-colors duration-200"
                      style={{
                        color: isActive ? "var(--accent)" : "var(--text-subtle)",
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ThemeSwitcher />
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeSwitcher />
            <button
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((o) => !o)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <span
                className="block w-5 h-px transition-all duration-300 origin-center"
                style={{
                  background: "var(--text-muted)",
                  transform: mobileOpen ? "translateY(4px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "var(--text-muted)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300 origin-center"
                style={{
                  background: "var(--text-muted)",
                  transform: mobileOpen ? "translateY(-4px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile nav overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          background: "var(--bg)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8" aria-label="Mobile navigation links">
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="font-mono text-2xl font-medium tracking-widest uppercase transition-all duration-200"
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
