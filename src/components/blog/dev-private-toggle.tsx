import { ReactNode } from 'react';

export function DevPrivateToggle({ children }: { children: ReactNode }) {
  // Don't render the toggle or wrappers in production at all
  if (process.env.NODE_ENV === 'production') return children;

  return (
    <div className="group/dev">
      <div className="flex items-center gap-3 mb-6 p-3 rounded-lg border border-border bg-surface text-xs text-text-muted w-fit animate-fade-in-up stagger-1">
        <span className="font-medium">Dev Mode:</span>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="sr-only"
            defaultChecked
            aria-label="Toggle private blogs visibility"
          />
          <div className="relative w-8 h-4 bg-border rounded-full transition-colors group-has-[:checked]:bg-accent">
            <div className="absolute left-[2px] top-[2px] size-[12px] bg-bg rounded-full transition-transform group-has-[:checked]:translate-x-[16px]"></div>
          </div>
          <span className="text-text-muted group-has-[:checked]:text-text">Show Private Posts</span>
        </label>
      </div>
      <div className="group-has-[input:not(:checked)]/dev:[&_[data-private]]:hidden">
        {children}
      </div>
    </div>
  );
}
