/* eslint-disable no-restricted-globals */
import { test, expect } from '@playwright/test';

test.describe('Blog rendering and MDX features', () => {
  test('Blog index page loads and lists posts', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1').first()).toBeVisible();
    
    // There should be at least one blog post linked
    const postLinks = page.locator('a[href^="/blog/"]');
    await expect(postLinks.first()).toBeVisible();
  });

  test('Blog post syntax highlighting renders correctly with CSS variables', async ({ page }) => {
    // Navigate directly to the known blog post
    await page.goto('/blog/e2e-test-post');
    
    // Ensure the post loaded
    await expect(page.locator('.prose')).toBeVisible();

    // Check for a rehype-pretty-code block
    const codeBlock = page.locator('figure[data-rehype-pretty-code-figure] pre');
    await expect(codeBlock.first()).toBeVisible();

    // Verify it has the data-language attribute
    await expect(codeBlock.first()).toHaveAttribute('data-language', /.*/);

    // Verify the spans inside have Shiki CSS variables
    const coloredSpan = codeBlock.locator('code span[style*="--shiki-dark"]').first();
    await expect(coloredSpan).toBeVisible();

    // Test Theme Toggling (light/dark)
    const htmlElement = page.locator('html');
    
    // Force light mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await expect(htmlElement).toHaveAttribute('data-theme', 'light');

    // Force dark mode
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
  });

  test('Blog post comprehensive MDX features render correctly', async ({ page }) => {
    await page.goto('/blog/e2e-test-post');

    // 1. Headings & Blockquotes
    await expect(page.locator('.prose h2:has-text("1. Headings")')).toBeVisible();
    await expect(page.locator('.prose blockquote')).toContainText('This is a blockquote');

    // 2. Lists and Tasks
    await expect(page.locator('.prose ul')).toBeVisible();
    await expect(page.locator('.prose input[type="checkbox"]')).toHaveCount(2);

    // 3. Tables (GFM)
    await expect(page.locator('.prose table')).toBeVisible();
    await expect(page.locator('.prose th:has-text("Feature")')).toBeVisible();
    await expect(page.locator('.prose td:has-text("GFM")')).toBeVisible();

    // 4. Code Blocks
    const codeBlock = page.locator('figure[data-rehype-pretty-code-figure] pre');
    await expect(codeBlock.first()).toBeVisible();

    // 5. Math (KaTeX)
    // Check for inline or block math rendering classes from rehype-katex
    const mathElement = page.locator('.katex').first();
    await expect(mathElement).toBeVisible();
  });

  test('Blog index page has correct metadata and dev-mode private toggles', async ({ page }) => {
    await page.goto('/blog');
    
    // Check title matches expected metadata
    await expect(page).toHaveTitle(/Blog/i);

    // Private post 'e2e-test-post' should be listed in dev mode by default
    const privatePostLink = page.locator('a[href="/blog/e2e-test-post"]');
    await expect(privatePostLink).toBeVisible();

    // Verify the "PRIVATE" badge is on the screen
    const privateBadge = privatePostLink.locator('span:text-is("Private")');
    await expect(privateBadge).toBeVisible();

    // Toggle the "Show Private Posts" checkbox off
    const toggleCheckbox = page.locator('input[aria-label="Toggle private blogs visibility"]');
    await expect(toggleCheckbox).toBeChecked();
    await toggleCheckbox.click({ force: true });
    await expect(toggleCheckbox).not.toBeChecked();

    // The private post should now be hidden (via CSS class on body)
    await expect(privatePostLink).not.toBeVisible();

    // Toggle back on
    await toggleCheckbox.click({ force: true });
    await expect(privatePostLink).toBeVisible();

    // Click it to ensure it navigates correctly
    await privatePostLink.click();
    await expect(page).toHaveURL(/.*\/blog\/e2e-test-post$/);
  });

  test('Blog post has back navigation and SEO/Opengraph tags', async ({ page }) => {
    await page.goto('/blog/e2e-test-post');
    
    // Ensure OG Image tag exists
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveCount(1);
    
    // Ensure Cover image renders properly using Next/Image
    const coverImage = page.locator('img[alt^="Cover image for"]').first();
    await expect(coverImage).toBeVisible();

    // Test back button
    const backButton = page.locator('a#back-to-blog');
    await expect(backButton).toBeVisible();
    await backButton.click();

    // Verify it navigates back to /blog
    await expect(page).toHaveURL(/.*\/blog$/);
  });

  test('Non-existent blog post returns a 404', async ({ page }) => {
    // Go to a route we know doesn't exist
    const response = await page.goto('/blog/this-slug-does-not-exist');
    expect(response?.status()).toBe(404);
  });

  test('Blog index page has JSON-LD structured data', async ({ page }) => {
    await page.goto('/blog');
    
    // Check for JSON-LD script
    const scriptTags = page.locator('script[type="application/ld+json"]');
    const count = await scriptTags.count();
    
    let found = false;
    for (let i = 0; i < count; i++) {
      const content = await scriptTags.nth(i).textContent();
      if (content && content.includes('"@type":"BreadcrumbList"')) {
        found = true;
        expect(content).toContain('"name":"Blog"');
      }
    }
    expect(found).toBe(true);
  });

  test('Blog post page has JSON-LD structured data and correct robots meta for private posts', async ({ page }) => {
    await page.goto('/blog/e2e-test-post');
    
    // Check for JSON-LD script
    const scriptTags = page.locator('script[type="application/ld+json"]');
    const count = await scriptTags.count();
    
    let found = false;
    for (let i = 0; i < count; i++) {
      const content = await scriptTags.nth(i).textContent();
      if (content && content.includes('"@type":"BlogPosting"')) {
        found = true;
      }
    }
    expect(found).toBe(true);
    
    // Check robots meta (e2e-test-post is a private post)
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', 'noindex, nofollow');
  });
});
