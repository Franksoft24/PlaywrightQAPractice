import { Page, Locator, expect } from "@playwright/test";

export class CartPO{
    readonly page: Page; 
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;   

    constructor(page: Page) {
        this.page = page;   
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');     
    }

    async navigateToCart() {
        await this.page.goto('/cart.html');
    }

    async removeItem(title: string) {
        const item = this.cartItems.filter({ hasText: title }).first();
        const removeButton = item.locator('button', { hasText: 'Remove' });
        await removeButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}