export class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('.check_out');
    }

    async navigate() {
        await this.page.goto('/view_cart');
    }

    async deleteProduct(productId) {
        await this.page.locator(`[data-product-id="${productId}"]`).click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}


