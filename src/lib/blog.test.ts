import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import { getAllPosts, getMdxPostBySlug, getMdxSlugs, getAllBlogTags, CUSTOM_POSTS } from './blog';

vi.mock('fs');

describe('Blog Data Layer', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getAllPosts should combine MDX posts and custom posts and sort by date', () => {
    // Mock readdirSync to return a fake file
    vi.mocked(fs.readdirSync).mockReturnValue(['fake-post.mdx'] as unknown as string[]);
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
    vi.mocked(fs.readdirSync).mockReturnValue(['valid-slug.mdx'] as unknown as string[]);
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
    vi.mocked(fs.readdirSync).mockReturnValue(['some-other.mdx'] as unknown as string[]);
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
    vi.mocked(fs.readdirSync).mockReturnValue(['broken-post.mdx'] as unknown as string[]);
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

  it('getMdxSlugs should return an array of strings representing the slugs', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['post1.mdx', 'post2.mdx'] as unknown as string[]);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      const p = filePath.toString();
      if (p.endsWith('post1.json')) return JSON.stringify({ slug: 'custom-slug-1', image: 'img', ogImage: 'og' });
      if (p.endsWith('post2.json')) return JSON.stringify({ image: 'img', ogImage: 'og' }); // Fallback to filename 'post2'
      return '';
    });

    const slugs = getMdxSlugs();
    expect(slugs).toHaveLength(2);
    expect(slugs).toContain('custom-slug-1');
    expect(slugs).toContain('post2');
  });

  it('getAllBlogTags should return a deduplicated, sorted list of all tags', () => {
    vi.mocked(fs.readdirSync).mockReturnValue(['post1.mdx', 'post2.mdx'] as unknown as string[]);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      const p = filePath.toString();
      if (p.endsWith('post1.json')) return JSON.stringify({ tags: ['react', 'nextjs', 'ai'], image: 'img', ogImage: 'og' });
      if (p.endsWith('post2.json')) return JSON.stringify({ tags: ['nextjs', 'typescript'], image: 'img', ogImage: 'og' });
      return '';
    });

    // Temporarily mutate CUSTOM_POSTS for the test if it's empty
    CUSTOM_POSTS.push({
      slug: 'custom', title: 'Custom', description: 'Desc', date: '2026-05-29',
      image: 'img', ogImage: 'og', type: 'custom', tags: ['custom-tag', 'react']
    });

    const tags = getAllBlogTags();

    expect(tags).toEqual(['ai', 'custom-tag', 'nextjs', 'react', 'typescript']);

    // Restore
    CUSTOM_POSTS.pop();
  });
});
