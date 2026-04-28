export class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
  }

  async dismissAdIfPresent() {
    const adClose = this.page.locator('.continue-prompt-text');
    try {
      await adClose.waitFor({ state: 'visible', timeout: 3000 });
      await adClose.click();
    } catch {
      // No ad appeared — continue normally
    }
  }

  async navigate() {
    await this.page.goto('/products');
    await this.dismissAdIfPresent();
  }

  async searchForProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addToCart(productId) {
    await this.dismissAdIfPresent();
    await this.page.locator(`[data-product-id="${productId}"]`).first().click();
    await this.dismissAdIfPresent();
  }

  async continueShopping() {
    await this.dismissAdIfPresent();
    await this.continueShoppingButton.waitFor({ state: 'visible' });
    await this.continueShoppingButton.click();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }
}

// TODO: WebKit ad handling - ads appear randomly and block Continue Shopping modal
// Investigate alternative locator for ad close button on WebKit
// Tracked: products tests failing intermittently on webkit only