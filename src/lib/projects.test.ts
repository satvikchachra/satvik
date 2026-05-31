import { describe, it, expect } from 'vitest';
import { PROJECTS, getAllTags } from './projects';

describe('Projects Data', () => {
  it('should have the correct data structure', () => {
    expect(Array.isArray(PROJECTS)).toBe(true);

    PROJECTS.forEach((item) => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('tags');
      expect(typeof item.title).toBe('string');
      expect(typeof item.description).toBe('string');
      expect(Array.isArray(item.tags)).toBe(true);

      if (item.githubUrl) {
        expect(typeof item.githubUrl).toBe('string');
        expect(item.githubUrl).toMatch(/^https?:\/\/.+/);
      }
      if (item.liveUrl) {
        expect(typeof item.liveUrl).toBe('string');
        expect(item.liveUrl).toMatch(/^https?:\/\/.+/);
      }
    });
  });

  describe('getAllTags', () => {
    it('should return unique tags sorted alphabetically', () => {
      const tags = getAllTags();

      const uniqueTags = [...new Set(tags)];
      expect(tags).toEqual(uniqueTags);

      const sortedTags = [...tags].sort();
      expect(tags).toEqual(sortedTags);

      expect(tags.length).toBeGreaterThan(0);
    });
  });
});
