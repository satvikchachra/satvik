import { describe, it, expect } from 'vitest';
import { EXPERIENCE } from './experience';

describe('Experience Data', () => {
  it('should have the correct data structure', () => {
    expect(Array.isArray(EXPERIENCE)).toBe(true);
    expect(EXPERIENCE.length).toBeGreaterThan(0);

    EXPERIENCE.forEach((item) => {
      expect(item).toHaveProperty('year');
      expect(item).toHaveProperty('company');
      expect(item).toHaveProperty('companyUrl');
      expect(item).toHaveProperty('role');
      expect(item).toHaveProperty('description');

      expect(typeof item.year).toBe('string');
      expect(typeof item.company).toBe('string');
      expect(typeof item.companyUrl).toBe('string');
      expect(typeof item.role).toBe('string');
      expect(typeof item.description).toBe('string');
      
      // Basic URL validation
      expect(item.companyUrl).toMatch(/^https?:\/\/.+/);
    });
  });
});
