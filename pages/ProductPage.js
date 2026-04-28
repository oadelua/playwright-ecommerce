export class ProductPage {
    constructor(page) {
        this.page = page;
        this.searchProduct = page.locator("#search_product");
        this.submitProducttSearch = page.locator('#submit_search');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });

    }

    async navigate() {
        await this.page.goto('/products');

    }

    async searchForProduct(productName) {
        await this.searchProduct.fill(productName);
        await this.submitProducttSearch.click();
    }

    async addToCart(productId) {
        await this.page.locator(`[data-product-id="${productId}"]`).first().click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async viewCart() {
        await this.viewCartLink.click();
    }
}