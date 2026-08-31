import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test('should navigate to the homepage and check title', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title matches
    await expect(page).toHaveTitle(/CVS CHARAN/);
    
    // Check if the hero heading is present
    const heading = page.locator('h1', { hasText: 'Hi, I\'m CVS CHARAN' });
    await expect(heading).toBeVisible();
  });

  test('should navigate to projects page from homepage', async ({ page }) => {
    await page.goto('/');
    
    // Click the "View Projects" button
    await page.click('text=View Projects');
    
    // Wait for URL to change to /projects
    await expect(page).toHaveURL(/.*\/projects/);
    
    // Ensure the projects heading is visible
    const projectsHeading = page.locator('h2', { hasText: 'My Projects' });
    await expect(projectsHeading).toBeVisible();
  });
});
