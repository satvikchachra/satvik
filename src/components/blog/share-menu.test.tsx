/* eslint-disable no-restricted-globals */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShareMenu } from './share-menu';
import type React from 'react';

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode; onOpenChange?: (open: boolean) => void }) => <div data-testid="dropdown">{children}</div>,
  DropdownMenuTrigger: ({ children, asChild }: { children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>; asChild?: boolean }) => {
    // If it's a button, let's just make it call onOpenChange
    return <div onClick={(e) => asChild && children.props.onClick ? children.props.onClick(e) : null} role="button" tabIndex={0} onKeyDown={() => {}}>{children}</div>;
  },
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onSelect }: { children: React.ReactNode; onSelect?: (e: React.SyntheticEvent) => void }) => (
    <div onClick={(e) => onSelect && onSelect(e)} role="menuitem" tabIndex={0} onKeyDown={() => {}}>{children}</div>
  ),
}));

describe('ShareMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    // Reset share API
    if ('share' in navigator) delete (navigator as unknown as Record<string, unknown>).share;
    if ('canShare' in navigator) delete (navigator as unknown as Record<string, unknown>).canShare;

    // Mock window location
    delete (window as unknown as { location: unknown }).location;
    Object.defineProperty(window, 'location', {
      value: { href: 'http://localhost/blog/test' },
      writable: true
    });
  });

  it('renders the share button', () => {
    render(<ShareMenu title="Test Title" />);
    expect(screen.getByRole('button', { name: /share post/i })).toBeInTheDocument();
  });

  it('copies link to clipboard when "Copy link" is clicked', async () => {
    render(<ShareMenu title="Test Title" />);
    
    // Open menu
    const button = screen.getByRole('button', { name: /share post/i });
    fireEvent.click(button);

    // Click copy link
    const copyOption = await screen.findByText('Copy link');
    fireEvent.click(copyOption);

    // Verify clipboard was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/blog/test');
    
    // Verify text changed to "Copied!"
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('renders native share option when navigator.canShare is true', async () => {
    Object.assign(navigator, {
      canShare: vi.fn().mockReturnValue(true),
      share: vi.fn().mockResolvedValue(undefined),
    });

    render(<ShareMenu title="Test Title" />);
    
    // Open menu
    const button = screen.getByRole('button', { name: /share post/i });
    fireEvent.click(button);

    // Verify share option exists
    expect(await screen.findByText('Share')).toBeInTheDocument();
  });

  it('does not render native share option when navigator.canShare is false', async () => {
    Object.assign(navigator, {
      canShare: vi.fn().mockReturnValue(false),
    });

    render(<ShareMenu title="Test Title" />);
    
    // Open menu
    const button = screen.getByRole('button', { name: /share post/i });
    fireEvent.click(button);

    // Wait a tick for render
    await new Promise((r) => setTimeout(r, 0));

    // Verify share option does NOT exist
    expect(screen.queryByText('Share')).not.toBeInTheDocument();
  });

  it('calls navigator.share when native share option is clicked', async () => {
    Object.assign(navigator, {
      canShare: vi.fn().mockReturnValue(true),
      share: vi.fn().mockResolvedValue(undefined),
    });

    render(<ShareMenu title="Test Title" />);
    
    // Open menu
    const button = screen.getByRole('button', { name: /share post/i });
    fireEvent.click(button);

    // Click share option
    const shareOption = await screen.findByText('Share');
    fireEvent.click(shareOption);

    // Verify share was called
    expect(navigator.share).toHaveBeenCalledWith({
      title: 'Test Title',
      url: 'http://localhost/blog/test'
    });
  });
});
