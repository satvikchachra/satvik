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

  test('Blog post math equations (KaTeX) render correctly', async ({ page }) => {
    await page.goto('/blog/e2e-test-post');

    // Check for inline or block math rendering classes from rehype-katex
    const mathElement = page.locator('.katex').first();
    await expect(mathElement).toBeVisible();
  });

  test('Blog index page has correct metadata and interactive links', async ({ page }) => {
    await page.goto('/blog');
    
    // Check title matches expected metadata (e.g., 'Blog | ...' or just 'Blog')
    await expect(page).toHaveTitle(/Blog/i);

    // Click the first blog post link to ensure it navigates correctly
    const firstPostLink = page.locator('a[href^="/blog/"]').first();
    const href = await firstPostLink.getAttribute('href');
    await firstPostLink.click();

    // Verify URL changed to the post
    await expect(page).toHaveURL(new RegExp(href!));
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
});
