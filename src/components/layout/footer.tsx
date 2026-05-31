import { FOOTER_CONTENT } from '@/lib/content';
import { SocialLinks } from '@/components/social-links';

export function Footer() {
  return (
    <footer className="mt-0 border-t border-border-subtle">
      <div className="max-w-xl mx-auto p-6 flex items-center justify-between">
        {/* Social links */}
        <nav aria-label="Social links">
          <ul className="flex items-center gap-4">
            <SocialLinks
              asListItem
              linkClassName="text-text-muted hover:text-text transition-colors duration-200 block"
              iconClassName="size-4"
            />
          </ul>
        </nav>

        <p className="text-xs tracking-wide text-text-subtle">{FOOTER_CONTENT.license}</p>
      </div>
    </footer>
  );
}
