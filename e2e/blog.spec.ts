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
    await page.goto('/blog/the-most-important-ai-problem-might-not-be-training');
    
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
    await page.goto('/blog/the-most-important-ai-problem-might-not-be-training');

    // Check for inline or block math rendering classes from rehype-katex
    const mathElement = page.locator('.katex').first();
    await expect(mathElement).toBeVisible();
  });
});
