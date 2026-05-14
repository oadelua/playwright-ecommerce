import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { createUser, deleteUser } from '../../utils/apiUtils.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  
  await page.waitForLoadState('domcontentloaded');

  const consentButton = page.getByRole('button', { name: 'Consent' });
  try {
    await consentButton.waitFor({ state: 'visible', timeout: 5000 });
    await consentButton.click();
  } catch {
    // No consent popup — continue
  }
});


test('create user via API then login via UI @smoke', async ({ page, request }) => {
  console.log('Step 1: Starting test');
  const email = `user${Date.now()}@maildrop.cc`;
  const password = process.env.REGISTER_PASSWORD;
  
  console.log('Step 2: Password defined:', !!password);

  console.log('Step 3: Creating user via API');
  const createResponse = await createUser(request, email, password);
  console.log('Step 4: Create response:', JSON.stringify(createResponse));

  console.log('Step 5: Navigating to login');
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  console.log('Step 6: Current URL:', page.url());

  console.log('Step 7: Logging in');
  await loginPage.login(email, password);
  console.log('Step 8: URL after login:', page.url());

  await expect(page.getByRole('link', { name: 'Logout' }))
    .toBeVisible({ timeout: 10000 });

  await deleteUser(request, email, password);
});