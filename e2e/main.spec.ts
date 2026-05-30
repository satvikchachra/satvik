import { test, expect } from '@playwright/test';

test.describe('Main Application Navigation and Pages', () => {
  test('Home page loads correctly and has expected content', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.locator('h1')).toHaveText(/satvik chachra/i);
    
    // Check wins section
    await expect(page.locator('text=selected wins')).toBeVisible();
    
    // Check experience section
    await expect(page.locator('h2:has-text("experience")')).toBeVisible();
    
    // Check recent blogs section
    // Assuming there are posts on the site
    await expect(page.locator('h2:has-text("recent blogs")')).toBeVisible();
  });

  test('Navigation menu works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click on About
    await page.click('nav[aria-label="Main navigation"] >> text=about');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toHaveText(/satvik chachra/i); // About page h1 is name
    
    // Click on Projects
    await page.click('nav[aria-label="Main navigation"] >> text=projects');
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1')).toHaveText(/projects/i);
    
    // Click on Blog
    await page.click('nav[aria-label="Main navigation"] >> text=blog');
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1')).toHaveText(/blog/i);
    
    // Click on Contact
    await page.click('nav[aria-label="Main navigation"] >> text=contact');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toHaveText(/get in touch/i);
    
    // Go back home by clicking brand name
    await page.click('a[aria-label="Satvik Chachra — Home"]');
    await expect(page).toHaveURL('/');
  });

  test('Mobile menu toggles correctly', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Open menu
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    
    // Check menu is open and click 'about'
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible();
    
    await mobileNav.locator('text=about').click();
    
    // Check navigation happened and menu closed
    await expect(page).toHaveURL('/about');
    await expect(mobileNav).not.toBeVisible();
  });

  test('404 page works', async ({ page }) => {
    const response = await page.goto('/some-random-page-that-does-not-exist');
    expect(response?.status()).toBe(404);
    
    await expect(page.locator('h1')).toHaveText(/page not found/i);
    
    // Click go home
    await page.click('text=← go home');
    await expect(page).toHaveURL('/');
  });
});
