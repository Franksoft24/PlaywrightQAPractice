import { Page, Locator, expect } from "@playwright/test";

export class InventoryPO {
  readonly page: Page;
  readonly products: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.inventory_item');
    this.cart = page.locator('.shopping_cart_link');
  }

  async navigateToInventory() {
    await this.page.goto('/inventory.html');
  }

  async getProduct(title: string): Promise<Locator> {
    return this.products.filter({ hasText: title }).first();
  }

  async addToCart(title: string) {
    const product = await this.getProduct(title);
    const addButton = product.locator('button', { hasText: 'Add to cart' });
    await addButton.click();
  }

  async cartCountExpect(count?: number) {
    const cartBadge = this.cart.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveCount(count? 1 : 0);
  }

  async removeFromCart(title: string) {
    const product = await this.getProduct(title);
    const removeButton = product.locator('button', { hasText: 'Remove' });
    await removeButton.click();
  }

  async goToCart() {
    await this.cart.click();
  }

}