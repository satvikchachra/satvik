import { test, expect } from '@playwright/test';
import { HOME_CONTENT, ABOUT_CONTENT, PROJECTS_CONTENT, CONTACT_CONTENT } from '../src/lib/content';

test.describe('Main Application Navigation and Pages', () => {
  test('Home page loads correctly and has expected content', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    await expect(page.locator('h1')).toHaveText(new RegExp(HOME_CONTENT.heroTitle, 'i'));

    // Check wins section
    await expect(page.locator(`text=${HOME_CONTENT.sectionWins}`)).toBeVisible();
  });

  test('Navigation menu works correctly', async ({ page }) => {
    await page.goto('/');

    // Click on About
    await page.click('nav[aria-label="Main navigation"] >> text=about');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toHaveText(new RegExp(ABOUT_CONTENT.heroTitle, 'i')); // About page h1 is name

    // Click on Projects
    await page.click('nav[aria-label="Main navigation"] >> text=projects');
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1')).toHaveText(new RegExp(PROJECTS_CONTENT.heroTitle, 'i'));

    // Click on Blog
    await page.click('nav[aria-label="Main navigation"] >> text=blog');
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1')).toHaveText(/blog/i);

    // Click on Contact
    await page.click('nav[aria-label="Main navigation"] >> text=contact');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toHaveText(new RegExp(CONTACT_CONTENT.heroTitle, 'i'));

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
    const mobileNav = page.locator('div[role="menu"][aria-label="Mobile navigation"]');
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

  test('About page content renders correctly', async ({ page }) => {
    await page.goto('/about');

    // Check main heading
    await expect(page.locator('h1')).toHaveText(new RegExp(ABOUT_CONTENT.heroTitle, 'i'));

    // Check all major sections
    await expect(page.locator(`h2:has-text("${ABOUT_CONTENT.sectionExperience}")`)).toBeVisible();
    await expect(page.locator(`h2:has-text("${ABOUT_CONTENT.sectionStack}")`)).toBeVisible();
    await expect(page.locator(`h2:has-text("${ABOUT_CONTENT.sectionEducation}")`)).toBeVisible();
    await expect(page.locator(`h2:has-text("${ABOUT_CONTENT.sectionAwards}")`)).toBeVisible();
  });

  test('Contact page links render correctly', async ({ page }) => {
    await page.goto('/contact');

    // Check main heading
    await expect(page.locator('h1')).toHaveText(new RegExp(CONTACT_CONTENT.heroTitle, 'i'));

    // Verify all contact links are present and have valid hrefs
    await expect(page.locator('a[id="contact-github"]')).toHaveAttribute(
      'href',
      'https://github.com/satvikchachra',
    );
    await expect(page.locator('a[id="contact-twitter"]')).toHaveAttribute(
      'href',
      'https://twitter.com/satvikchachra',
    );
    await expect(page.locator('a[id="contact-linkedin"]')).toHaveAttribute(
      'href',
      'https://linkedin.com/in/satvikchachra',
    );
    await expect(page.locator('a[id="contact-email"]')).toHaveAttribute(
      'href',
      'mailto:consultwithsatvik@gmail.com',
    );
  });

  test('Projects page list renders correctly', async ({ page }) => {
    await page.goto('/projects');

    // Check main heading
    await expect(page.locator('h1')).toHaveText(new RegExp(PROJECTS_CONTENT.heroTitle, 'i'));

    // Assuming the ProjectsList renders links or a grid/list of projects, check that at least one project is visible.
    // Assuming there are actual projects in the list
    const projectLinks = page.locator('a[id^="project-"]');
    if ((await projectLinks.count()) > 0) {
      await expect(projectLinks.first()).toBeVisible();
    }
  });

  test('Global UI: Footer renders correctly', async ({ page }) => {
    await page.goto('/');

    // Check footer elements
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer social links
    await expect(footer.locator('a[aria-label="GitHub"]')).toHaveAttribute(
      'href',
      'https://github.com/satvikchachra',
    );
    await expect(footer.locator('a[aria-label="X (Twitter)"]')).toHaveAttribute(
      'href',
      'https://twitter.com/satvikchachra',
    );
    await expect(footer.locator('a[aria-label="LinkedIn"]')).toHaveAttribute(
      'href',
      'https://linkedin.com/in/satvikchachra',
    );
    await expect(footer.locator('a[aria-label="Email"]')).toHaveAttribute(
      'href',
      'mailto:consultwithsatvik@gmail.com',
    );
  });

  test('Global UI: Theme toggler works', async ({ page }) => {
    await page.goto('/');

    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeButton).toBeVisible();

    // Click to open the dropdown
    await themeButton.click();

    // Select 'Light' theme
    const lightOption = page.locator('div[role="menuitem"]:has-text("Light")');
    await expect(lightOption).toBeVisible();
    await lightOption.click();

    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('data-theme', 'light');

    // Wait for the dropdown to fully close and animate out before clicking again
    await expect(lightOption).not.toBeVisible();

    // Click again and select 'Dark'
    await themeButton.click();
    const darkOption = page.locator('div[role="menuitem"]:has-text("Dark")');
    await expect(darkOption).toBeVisible();
    await darkOption.click();

    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
  });
});
