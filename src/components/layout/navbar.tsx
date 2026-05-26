"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
        className="max-w-xl mx-auto px-6 h-10 flex items-center justify-between"
      >
        {/* Name / home link */}
        <Link
          href="/"
          aria-label="Satvik Chachra — Home"
          className="text-xs tracking-wide transition-colors duration-200"
          style={{ color: isHome ? "var(--text-subtle)" : "var(--text-muted)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isHome ? "var(--text-subtle)" : "var(--text-muted)")}
        >
          satvik chachra
        </Link>

        {/* Right side: back link on inner pages + theme toggle */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <Link
              href="/"
              className="text-xs transition-colors duration-200"
              style={{ color: "var(--text-subtle)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-subtle)")}
              aria-label="Back to home"
            >
              ← home
            </Link>
          )}
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
