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

  it('opens dropdown and calls setTheme when an option is clicked', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      themes: [],
    });

    render(<ThemeSwitcher />);

    // Click trigger to open dropdown
    const trigger = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.pointerDown(trigger);

    // Verify all three options are visible
    const lightOption = screen.getByRole('menuitem', { name: /light/i });
    const darkOption = screen.getByRole('menuitem', { name: /dark/i });
    const systemOption = screen.getByRole('menuitem', { name: /system/i });

    expect(lightOption).toBeInTheDocument();
    expect(darkOption).toBeInTheDocument();
    expect(systemOption).toBeInTheDocument();

    // Click Light
    fireEvent.click(lightOption);
    expect(mockSetTheme).toHaveBeenCalledWith('light');

    // Reset mock and re-open dropdown
    mockSetTheme.mockClear();
    fireEvent.pointerDown(trigger);

    // Click Dark
    fireEvent.click(screen.getByRole('menuitem', { name: /dark/i }));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');

    // Reset mock and re-open dropdown
    mockSetTheme.mockClear();
    fireEvent.pointerDown(trigger);

    // Click System
    fireEvent.click(screen.getByRole('menuitem', { name: /system/i }));
    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });
});
