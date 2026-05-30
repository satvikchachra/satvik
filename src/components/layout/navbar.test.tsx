import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './navbar';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// We only need to mock ThemeSwitcher so it doesn't try to render next-themes Providers without context
vi.mock('@/components/theme-switcher', () => ({
  ThemeSwitcher: () => <button data-testid="theme-switcher-mock">Theme</button>,
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('renders the home link and navigation items', () => {
    render(<Navbar />);
    
    // Check main brand/home link
    expect(screen.getByRole('link', { name: /satvik chachra — home/i })).toBeInTheDocument();
    
    // Check navigation items
    expect(screen.getByRole('link', { name: /about/i, hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i, hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i, hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i, hidden: true })).toBeInTheDocument();
  });

  it('highlights the active link based on pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/projects');
    render(<Navbar />);
    
    const projectsLinks = screen.getAllByRole('link', { name: /projects/i, hidden: true });
    // Assuming the class name contains text-text for active links
    projectsLinks.forEach(link => {
       expect(link).toHaveClass('text-text');
    });
    
    const aboutLinks = screen.getAllByRole('link', { name: /about/i, hidden: true });
    aboutLinks.forEach(link => {
       expect(link).toHaveClass('text-text-muted');
    });
  });

  it('toggles mobile menu on button click', () => {
    render(<Navbar />);
    
    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-label', 'Close menu');
    
    fireEvent.click(toggleButton);
    
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });

  it('closes mobile menu on escape key', () => {
    render(<Navbar />);
    
    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(toggleButton);
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
    
    fireEvent.keyDown(screen.getByRole('banner'), { key: 'Escape', code: 'Escape' });
    
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});
