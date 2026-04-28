import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { SignUpPage } from '../../pages/SignUpPage.js';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';

test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Dismiss cookie consent if it appears
    const consentButton = page.getByRole('button', { name: 'Consent' });
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }

    // Dismiss ad popup if it appears
    const adCloseButton = page.locator('.continue-prompt-text');
    if (await adCloseButton.isVisible()) {
        await adCloseButton.click();
    }
});

test('verify user can search for a product successfully @smoke', async ({ page }) => {

    const productPage = new ProductPage(page);
    await productPage.navigate();
    await productPage.searchForProduct('Blue Top');

    await expect(page.getByText('Searched Products')).toBeVisible();
    await expect(page.getByText('Blue Top').first()).toBeVisible();
    await expect(page).toHaveURL('/products?search=Blue%20Top');

});

test('verify user can add product to cart successfully @smoke', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.navigate();
    await productPage.addToCart(1);
    await productPage.continueShopping();
    await productPage.addToCart(2);
    await productPage.continueShopping();
    await cartPage.navigate();

    await expect(page).toHaveURL('/view_cart');
    await expect(page.locator(`[data-product-id="1"]`)).toBeVisible();
    await expect(page.locator(`[data-product-id="2"]`)).toBeVisible();

});

test('verify user can delete product from cart successfully @regression', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.navigate();
    await productPage.addToCart(1);
    await productPage.continueShopping();
    await productPage.addToCart(2);
    await productPage.continueShopping();
    await cartPage.navigate();

    await cartPage.deleteProduct(1);
    await page.locator('[data-product-id="1"]').waitFor({ state: 'detached' });
    // await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-product-id="1"]')).not.toBeVisible();
    await expect(page.locator('[data-product-id="2"]')).toBeVisible();
});