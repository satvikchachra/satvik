"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu on path changes (navigation)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/blog", label: "blog" },
    { href: "/contact", label: "contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      role="banner"
      className="fixed top-0 inset-x-0 z-50"
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--bg)",
      }}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-xl mx-auto px-6 h-10 flex items-center justify-between relative"
      >
        {/* Left: Name / home link */}
        <Link
          href="/"
          aria-label="Satvik Chachra — Home"
          className="text-xs tracking-wide transition-colors duration-200"
          style={{ color: pathname === "/" ? "var(--text-subtle)" : "var(--text-muted)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = pathname === "/" ? "var(--text-subtle)" : "var(--text-muted)")}
        >
          satvik chachra
        </Link>

        {/* Right side: Desktop links + ThemeSwitcher, Mobile hamburger + ThemeSwitcher */}
        <div className="flex items-center gap-3">
          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-4 mr-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs transition-colors duration-200"
                  style={{ color: active ? "var(--text)" : "var(--text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = active ? "var(--text)" : "var(--text-muted)")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <ThemeSwitcher />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex sm:hidden items-center justify-center w-8 h-8 rounded-md transition-colors duration-200"
            style={{
              color: "var(--text-subtle)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
              (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-subtle)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            {isOpen ? (
              /* Close Icon */
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger Icon */
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu dropdown overlay */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="absolute top-10 inset-x-0 z-40 flex sm:hidden flex-col px-6 py-4 gap-3 border-b animate-fade-in-up"
            style={{
              background: "var(--bg)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            {navItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs py-2 transition-colors duration-200"
                  style={{
                    color: active ? "var(--text)" : "var(--text-muted)",
                    animationDelay: `${(idx + 1) * 40}ms`,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = active ? "var(--text)" : "var(--text-muted)")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
