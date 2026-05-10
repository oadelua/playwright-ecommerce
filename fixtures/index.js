import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // Setup — dismiss consent and login
    await page.goto('/');
    
    const consentButton = page.getByRole('button', { name: 'Consent' });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      process.env.LOGIN_EMAIL,
      process.env.LOGIN_PASSWORD
    );

    // Hand logged-in page to test
    await use(page);
  },
});

export { expect } from '@playwright/test';