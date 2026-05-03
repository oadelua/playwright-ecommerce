import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { createUser, deleteUser } from '../../utils/apiUtils.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  const consentButton = page.getByRole('button', { name: 'Consent' });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
});

test('create user via API then login via UI @smoke', async ({ page, request }) => {
  // Step 1 — Create user via API
  const email = `user${Date.now()}@maildrop.cc`;
  const password = process.env.REGISTER_PASSWORD;

  await createUser(request, email, password);

  // Step 2 — Login via UI
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(email, password);

  await expect(page.getByText(/Logged in as/)).toBeVisible();

  // Step 3 — Cleanup via API
  await deleteUser(request, email, password);
});