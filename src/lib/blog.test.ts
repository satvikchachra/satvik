import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { getAllPosts, getMdxPostBySlug, getMdxSlugs } from './blog';

vi.mock('fs');

describe('Blog Data Layer', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getAllPosts should combine MDX posts and custom posts and sort by date', () => {
    // Mock readdirSync to return a fake file
    vi.mocked(fs.readdirSync).mockReturnValue(['fake-post.mdx'] as any);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    // Mock file reads
    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      const p = filePath.toString();
      if (p.endsWith('fake-post.mdx')) {
        return 'Mock content for reading time.';
      }
      if (p.endsWith('fake-post.json')) {
        return JSON.stringify({
          title: 'Fake Post',
          date: '2026-05-29',
          image: '/fake-image.jpg',
          ogImage: '/fake-og.jpg',
          tags: ['test']
        });
      }
      return '';
    });

    const posts = getAllPosts();
    expect(posts).toBeInstanceOf(Array);
    
    // We expect at least the one mocked MDX post
    const fakePost = posts.find(p => p.slug === 'fake-post');
    expect(fakePost).toBeDefined();
    expect(fakePost?.title).toBe('Fake Post');
    expect(fakePost?.date).toBe('2026-05-29');
    expect(fakePost?.type).toBe('mdx');
  });

  it('getMdxPostBySlug should return correct data for a valid slug', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['valid-slug.mdx'] as any);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      const p = filePath.toString();
      if (p.endsWith('valid-slug.mdx')) {
        return 'Content body of valid slug.';
      }
      if (p.endsWith('valid-slug.json')) {
        return JSON.stringify({
          title: 'Valid Slug Title',
          date: '2026-01-01',
          image: '/img.png',
          ogImage: '/og.png'
        });
      }
      return '';
    });

    const post = getMdxPostBySlug('valid-slug');
    expect(post).toBeDefined();
    expect(post?.content).toBe('Content body of valid slug.');
    expect(post?.meta.title).toBe('Valid Slug Title');
  });

  it('getMdxPostBySlug should return null for an invalid slug', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['some-other.mdx'] as any);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      const p = filePath.toString();
      if (p.endsWith('some-other.json')) {
        return JSON.stringify({ image: 'img', ogImage: 'og' });
      }
      return '';
    });

    const post = getMdxPostBySlug('non-existent-slug');
    expect(post).toBeNull();
  });

  it('getMdxPosts should throw if mandatory image properties are missing', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['broken-post.mdx'] as any);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      const p = filePath.toString();
      if (p.endsWith('broken-post.mdx')) {
        return 'body';
      }
      if (p.endsWith('broken-post.json')) {
        return JSON.stringify({
          title: 'No Images Here'
          // Missing image and ogImage
        });
      }
      return '';
    });

    expect(() => getAllPosts()).toThrowError(/missing mandatory 'image' or 'ogImage'/);
  });
});
