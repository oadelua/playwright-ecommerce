import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  
  const consentButton = page.getByRole('button', { name: 'Consent' });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
});

test('homepage visual regression @visual', async ({ page }) => {
  await expect(page.locator('#header')).toHaveScreenshot('homepage-header.png', {
    mask: [page.locator('iframe')], // mask all ad iframes
  });
});

test('products page visual regression @visual', async ({ page }) => {
  await page.goto('/products');
  await page.waitForLoadState('domcontentloaded'); // ← change this
  await expect(page.locator('.features_items')).toHaveScreenshot('products-grid.png', {
    mask: [page.locator('iframe')],
    maxDiffPixels: 500
  });
});

test('login page visual regression @visual', async ({ page }) => {
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.locator('.login-form')).toHaveScreenshot('login-form.png');
});