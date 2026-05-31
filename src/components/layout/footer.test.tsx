import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { FOOTER_CONTENT, CONTACT_CONTENT } from '@/lib/content';

describe('Footer', () => {
  it('renders social links and license', () => {
    render(<Footer />);

    // Check social links dynamically
    CONTACT_CONTENT.links.forEach((link) => {
      const socialLink = screen.getByRole('link', { name: link.label });
      expect(socialLink).toHaveAttribute('href', link.href);
      if (link.href.startsWith('mailto')) {
        expect(socialLink).not.toHaveAttribute('target');
        expect(socialLink).not.toHaveAttribute('rel');
      } else {
        expect(socialLink).toHaveAttribute('target', '_blank');
        expect(socialLink).toHaveAttribute('rel', 'noreferrer');
      }
    });

    // Check license
    expect(screen.getByText(FOOTER_CONTENT.license)).toBeInTheDocument();
  });
});
