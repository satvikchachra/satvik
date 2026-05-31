import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from './theme-switcher';
import { useTheme } from 'next-themes';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeSwitcher', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a trigger button', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      themes: [],
    });

    render(<ThemeSwitcher />);

    const trigger = screen.getByRole('button', { name: /toggle theme/i });
    expect(trigger).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    // 1. Initial state: system -> resolved to dark
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      themes: [],
    });

    const { rerender } = render(<ThemeSwitcher />);

    const trigger = screen.getByRole('button', { name: /toggle theme/i });

    // Should toggle to light
    fireEvent.click(trigger);
    expect(mockSetTheme).toHaveBeenCalledWith('light');

    // 2. Change state to light
    mockSetTheme.mockClear();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      themes: [],
    });

    rerender(<ThemeSwitcher />);

    // Should toggle to dark
    fireEvent.click(trigger);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
