import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { SignUpPage } from '../../pages/SignUpPage.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  // Dismiss cookie consent if it appears
  const consentButton = page.getByRole('button', { name: 'Consent' });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
});

test('verify user can sign up successfully', async ({ page }) => {
  const email = `user${Date.now()}@maildrop.cc`;
  const signUpPage = new SignUpPage(page);

  await signUpPage.navigate();
  await signUpPage.signUp(
    'Cyber Guru',
    email,
   process.env.REGISTER_PASSWORD,
    '1',
    'January',
    '2000',
    'Cyber',
    'Guru',
    'MCP Company',
    '43 Cyber Street',
    'MCP Address 2',
    'India',
    'MCP State',
    'MCP City',
    '002134',
    '15978652369'
  );

  await expect(page).toHaveURL('/account_created');
});

test('verify user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  );

  await expect(page.getByText(/Logged in as/)).toBeVisible();
});

test('verify login fails with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(
    'invalid@email.com',
    'wrongpassword'
  );

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Your email or password is incorrect!');
});