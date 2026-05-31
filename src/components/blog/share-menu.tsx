'use client';
/* eslint-disable no-restricted-globals */

import { ShareIcon, LinkIcon } from '@/components/ui/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMemo, useState } from 'react';

interface ShareMenuProps {
  title: string;
}

export function ShareMenu({ title }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const canShare = useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

    try {
      const shareData = { title, url: window.location.href };
      if (navigator.canShare && navigator.canShare(shareData)) {
        return true;
      }
      return 'share' in navigator;
    } catch {
      return false;
    }
  }, [title]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const shareNative = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
        setOpen(false);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Failed to share', err);
        }
      }
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Share post"
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 hover:text-text hover:bg-surface ${
            open ? 'text-text bg-surface' : 'text-text-muted bg-transparent'
          }`}
        >
          <ShareIcon width={14} height={14} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-28 bg-bg border border-border text-text">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            copyLink();
          }}
          className="cursor-pointer focus:bg-surface focus:text-text"
        >
          <LinkIcon aria-hidden="true" />
          <span>{hasCopied ? 'Copied!' : 'Copy link'}</span>
        </DropdownMenuItem>

        {canShare && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              shareNative();
            }}
            className="cursor-pointer focus:bg-surface focus:text-text"
          >
            <ShareIcon aria-hidden="true" />
            <span>Share</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
