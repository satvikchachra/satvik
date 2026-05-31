'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MenuIcon as Menu, CloseIcon as X } from '@/components/ui/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { ThemeSwitcher } from '@/components/theme-switcher';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const navItems = [
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
  { href: '/contact', label: 'contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close dropdown on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      role="banner"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false);
        }
      }}
      className={`fixed top-0 inset-x-0 z-50 bg-bg transition-[border-color] duration-200 ${
        open ? 'border-b border-border' : 'border-b border-border-subtle'
      }`}
    >
      {/* ── Top bar ── */}
      <div className="max-w-xl mx-auto px-6 h-10 flex items-center justify-between">
        {/* Left: Name / home link */}
        <Link
          href="/"
          aria-label="Satvik Chachra — Home"
          className={`text-xs transition-colors duration-200 relative inline-flex items-center py-1 hover:text-text ${
            pathname === '/' ? 'text-text' : 'text-text-muted'
          }`}
        >
          <span className="relative py-0.5">
            satvik chachra
            {pathname === '/' && (
              <span className="absolute bottom-0 inset-x-0 h-[1.5px] rounded-full bg-text" />
            )}
          </span>
        </Link>

        {/* Right: Desktop nav + ThemeSwitcher + mobile toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* ── Desktop Navigation (sm+) ── */}
          <NavigationMenu viewport={false} className="hidden sm:flex" aria-label="Main navigation">
            <NavigationMenuList className="gap-4">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild active={active}>
                      <Link
                        href={item.href}
                        className={`text-xs transition-colors duration-200 relative inline-flex items-center py-1 hover:text-text ${
                          active ? 'text-text' : 'text-text-muted'
                        }`}
                      >
                        <span className="relative py-0.5">
                          {item.label}
                          {active && (
                            <span className="absolute bottom-0 inset-x-0 h-[1.5px] rounded-full bg-text" />
                          )}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeSwitcher />

          {/* ── Mobile hamburger (hidden sm+) ── */}
          <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200 text-text hover:bg-surface ${
                  open ? 'bg-surface' : 'bg-transparent'
                }`}
              >
                {open ? (
                  <X width={15} height={15} aria-hidden="true" />
                ) : (
                  <Menu width={15} height={15} aria-hidden="true" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              aria-label="Mobile navigation"
              className="w-48 sm:hidden bg-bg border border-border text-text"
            >
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="cursor-pointer focus:bg-surface focus:text-text"
                  >
                    <Link
                      href={item.href}
                      className={active ? 'text-text bg-surface' : 'text-text-muted'}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
