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
  

  

  
  const createResponse = await createUser(request, email, password);
  console.log('Step 4: Create response:', JSON.stringify(createResponse));

  
  const loginPage = new LoginPage(page);
  await loginPage.navigate();

  

  
  await loginPage.login(email, password);


  await expect(page.getByRole('link', { name: 'Logout' }))
    .toBeVisible();

  await deleteUser(request, email, password);
});