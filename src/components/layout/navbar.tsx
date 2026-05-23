"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const NAV_LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About"    },
  { href: "/projects", label: "Projects" },
  { href: "/blog",     label: "Blog"     },
  { href: "/contact",  label: "Contact"  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile nav on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50 transition-all duration-200"
        style={{
          background: scrolled ? "var(--bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="ui-sans max-w-3xl mx-auto px-6 h-12 flex items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Satvik Chachra — Home"
            className="ui-sans text-sm font-medium transition-opacity duration-200 hover:opacity-60"
            style={{ color: "var(--text)" }}
          >
            Satvik Chachra
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1" role="list">
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
                      className="ui-sans inline-block px-3 py-1.5 text-sm rounded-md transition-colors duration-150"
                      style={{
                        color: isActive ? "var(--text)" : "var(--text-subtle)",
                        background: isActive ? "var(--surface)" : "transparent",
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
          <div className="flex items-center gap-1 md:hidden">
            <ThemeSwitcher />
            <button
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((o) => !o)}
              className="ui-sans w-8 h-8 flex flex-col justify-center items-center gap-[5px] rounded-md transition-colors duration-150"
              style={{ color: "var(--text-subtle)" }}
            >
              <span
                className="block w-[18px] h-px transition-all duration-250 origin-center"
                style={{
                  background: "currentColor",
                  transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block w-[18px] h-px transition-all duration-250"
                style={{
                  background: "currentColor",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-[18px] h-px transition-all duration-250 origin-center"
                style={{
                  background: "currentColor",
                  transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : "none",
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
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-200"
        style={{
          background: "var(--bg)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <nav
          className="flex flex-col items-center justify-center h-full gap-6"
          aria-label="Mobile navigation links"
        >
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="ui-sans text-2xl font-medium transition-opacity duration-150"
                style={{
                  color: isActive ? "var(--text)" : "var(--text-muted)",
                  animationDelay: `${i * 50}ms`,
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
