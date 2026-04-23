import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('homepage has correct title', async ({ page }) => {
  await expect(page).toHaveTitle(/Practice Software Testing/);
});

test('verify user can register successfully', async ({ page }) => {
  const email = `user${Date.now()}@maildrop.cc`;

  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByTestId('register-link').click();
  await page.getByTestId('first-name').fill("Cyber");
  await page.getByTestId('last-name').fill("Guru");
  await page.getByTestId('dob').fill("2000-10-01");
  await page.getByTestId('country').selectOption("Ireland");
  await page.getByTestId('postal_code').fill("002134");
  await page.getByTestId('house_number').fill("43");
  await page.getByTestId('street').fill("Cyber Street");
  await page.getByTestId('city').fill("MCP City");
  await page.getByTestId('state').fill("MCP state");
  await page.getByTestId('phone').fill("15978652369");
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(process.env.REGISTER_PASSWORD);
  await page.getByTestId('register-submit').click();

  await expect(page).toHaveURL('/auth/login');
});

test('verify user can log in successfully', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign in' }).click();

  await page.getByTestId('email').fill(process.env.LOGIN_EMAIL);
  await page.getByTestId('password').fill(process.env.LOGIN_PASSWORD);
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL('/account');
});