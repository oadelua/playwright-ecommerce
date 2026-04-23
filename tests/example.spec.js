import { test, expect } from '@playwright/test';

test.beforeEach (async ({ page }) => {
  await page.goto('/');
});

test('homepage has correct title', async ({ page }) => {
  await expect(page).toHaveTitle(/Practice Software Testing/);
});

test('navigate to sign in page', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/auth/login');
});