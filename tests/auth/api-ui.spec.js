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
  const email = `user${Date.now()}@maildrop.cc`;
  const password = process.env.REGISTER_PASSWORD;
  
  console.log('Password defined:', !!password);
  console.log('Email:', email);

  // Step 1 — Create user via API
  const createResponse = await createUser(request, email, password);
  console.log('Create user response:', JSON.stringify(createResponse));

  // Step 2 — Login via UI
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(email, password);
  
  // Check URL after login
  console.log('URL after login:', page.url());

  await expect(page.getByRole('link', { name: 'Logout' }))
    .toBeVisible({ timeout: 10000 });

  // Step 3 — Cleanup
  await deleteUser(request, email, password);
});