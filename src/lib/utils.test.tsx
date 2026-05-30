import { describe, it, expect } from 'vitest';
import { cn, formatResumeText, formatDate } from './utils';
import { render } from '@testing-library/react';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge classes correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    });
  });

  describe('formatResumeText', () => {
    it('should format bold text correctly', () => {
      const { container } = render(<>{formatResumeText('This is **bold** text')}</>);
      const bElement = container.querySelector('b');
      expect(bElement).toBeInTheDocument();
      expect(bElement?.textContent).toBe('bold');
      expect(bElement?.className).toBe('font-semibold text-[var(--text)]');
    });

    it('should format underlined text correctly', () => {
      const { container } = render(<>{formatResumeText('This is __underlined__ text')}</>);
      const spanElement = container.querySelector('span');
      expect(spanElement).toBeInTheDocument();
      expect(spanElement?.textContent).toBe('underlined');
      expect(spanElement?.className).toBe('resume-underline');
    });

    it('should format nested or multiple formatting correctly', () => {
      const { container } = render(
        <>{formatResumeText('This is **bold** and __underlined__ text')}</>,
      );
      expect(container.querySelector('b')).toBeInTheDocument();
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('should return empty string for falsy input', () => {
      expect(formatResumeText('')).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      expect(formatDate('2024-01-15T00:00:00.000Z')).toBe('January 15, 2024');
      // Wait, let's just use a string without time for consistent local time interpretation or fix timezone
    });
  });
});
