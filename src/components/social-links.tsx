import { CONTACT_CONTENT } from '@/lib/content';
import { GitHubIcon, XIcon, LinkedInIcon, MailIcon } from '@/components/ui/icons';

const ICON_MAP = {
  'contact-github': GitHubIcon,
  'contact-x': XIcon,
  'contact-linkedin': LinkedInIcon,
  'contact-email': MailIcon,
} as const;

interface SocialLinksProps {
  linkClassName?: string;
  iconClassName?: string;
  asListItem?: boolean;
}

export function SocialLinks({
  linkClassName,
  iconClassName,
  asListItem = false,
}: SocialLinksProps) {
  return (
    <>
      {CONTACT_CONTENT.links.map(({ id, href, label }) => {
        const Icon = ICON_MAP[id as keyof typeof ICON_MAP];
        if (!Icon) return null;

        const link = (
          <a
            href={href}
            aria-label={label}
            {...(href.startsWith('mailto') ? {} : { target: '_blank', rel: 'noreferrer' })}
            className={linkClassName}
          >
            <Icon className={iconClassName} aria-hidden="true" />
          </a>
        );

        if (asListItem) {
          return <li key={id}>{link}</li>;
        }

        // We wrap non-list-item links in a fragment with key
        return (
          <span key={id} className="contents">
            {link}
          </span>
        );
      })}
    </>
  );
}
