import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './navbar';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// We only need to mock ThemeSwitcher so it doesn't try to render next-themes Providers without context
vi.mock('@/components/theme-switcher', () => ({
  ThemeSwitcher: () => (
    <button type="button" data-testid="theme-switcher-mock">
      Theme
    </button>
  ),
}));

// Mock Shadcn's DropdownMenu to avoid Radix UI pointer event issues in jsdom
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
const DropdownContext = require('react').createContext({});

vi.mock('@/components/ui/dropdown-menu', () => {
  const React = require('react');
  return {
    DropdownMenu: ({
      children,
      open,
      onOpenChange,
    }: {
      children: React.ReactNode;
      open?: boolean;
      onOpenChange?: (o: boolean) => void;
    }) => (
      <DropdownContext.Provider value={{ open, onOpenChange }}>
        <div>
          {children}
          {open && (
            <div role="menu" aria-label="Mobile navigation">
              Menu Opened
            </div>
          )}
        </div>
      </DropdownContext.Provider>
    ),
    DropdownMenuTrigger: ({
      children,
      asChild,
    }: {
      children: React.ReactNode;
      asChild?: boolean;
    }) => {
      const { open, onOpenChange } = React.useContext(DropdownContext) as any;
      const handleClick = () => onOpenChange?.(!open);

      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { onClick: handleClick } as any);
      }
      return (
        <button type="button" onClick={handleClick}>
          {children}
        </button>
      );
    },
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Navbar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('renders the home link and navigation items', () => {
    render(<Navbar />);

    // Check main brand/home link
    expect(screen.getByRole('link', { name: /satvik chachra — home/i })).toBeInTheDocument();

    // Check navigation items
    expect(screen.getAllByRole('link', { name: /about/i, hidden: true })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /projects/i, hidden: true })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /blog/i, hidden: true })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /contact/i, hidden: true })[0]).toBeInTheDocument();
  });

  it('highlights the active link based on pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/projects');
    render(<Navbar />);

    const projectsLinks = screen.getAllByRole('link', { name: /projects/i, hidden: true });
    // Assuming the class name contains text-text for active links
    projectsLinks.forEach((link) => {
      expect(link).toHaveClass('text-text');
    });

    const aboutLinks = screen.getAllByRole('link', { name: /about/i, hidden: true });
    aboutLinks.forEach((link) => {
      expect(link).toHaveClass('text-text-muted');
    });
  });

  it('toggles mobile menu on button click', async () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(screen.queryByRole('menu', { name: /mobile navigation/i })).not.toBeInTheDocument();

    fireEvent.pointerDown(toggleButton);
    fireEvent.click(toggleButton);

    const menu = await screen.findByRole('menu', { name: /mobile navigation/i });
    expect(menu).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.pointerDown(toggleButton);
    fireEvent.click(toggleButton);

    // Give radix time to animate out or remove from DOM
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.queryByRole('menu', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });

  it('closes mobile menu on escape key', async () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.pointerDown(toggleButton);
    fireEvent.click(toggleButton);
    const menu = await screen.findByRole('menu', { name: /mobile navigation/i });
    expect(menu).toBeInTheDocument();

    fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.queryByRole('menu', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });

  it('supports native keyboard focus styling on interactive elements', () => {
    render(<Navbar />);
    const homeLink = screen.getByRole('link', { name: /satvik chachra — home/i });
    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    
    expect(homeLink).not.toHaveClass('outline-none');
    expect(homeLink).not.toHaveClass('focus-visible:outline-none');
    
    expect(toggleButton).not.toHaveClass('outline-none');
    expect(toggleButton).not.toHaveClass('focus-visible:outline-none');
  });
});
