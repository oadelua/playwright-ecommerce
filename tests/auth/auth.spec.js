import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { SignUpPage } from '../../pages/SignUpPage.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Dismiss cookie consent if it appears
  const consentButton = page.getByRole('button', { name: 'Consent' });
  try {
    await consentButton.waitFor({ state: 'visible', timeout: 5000 });
    await consentButton.click();
    await page.waitForLoadState('networkidle');
  } catch {
    // No consent popup — continue
  }
});

test('verify user can sign up successfully @smoke', async ({ page }) => {
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

test('verify duplicate email registration is rejected @regression', async ({ page }) => {
  const signUpPage = new SignUpPage(page);

  await signUpPage.navigate();
  await signUpPage.signupName.fill('Cyber Guru');
  await signUpPage.signupEmail.fill(process.env.LOGIN_EMAIL);
  await signUpPage.signupButton.click();
  await expect(page.getByText('Email Address already exist!')).toBeVisible();
});

test('verify user can log in successfully @smoke', async ({ page }) => {
  test.info().annotations.push({ 
    type: 'description', 
    description: 'Verifies registered user can login with valid credentials' //Allure description
  });
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD
  );

  await expect(page.getByText(/Logged in as/)).toBeVisible();
  await expect(page).toHaveURL('/');
});


test('verify login fails with invalid credentials @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(
    'invalid@email.com',
    'wrongpassword'
  );

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Your email or password is incorrect!');
});

test('verify login fields are required @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await expect(loginPage.loginEmail).toHaveAttribute('required', '');
  await expect(loginPage.loginPassword).toHaveAttribute('required', '');
});