import { Page, Locator, expect } from "@playwright/test";

export class CheckOutPO {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    readonly finishButton: Locator;
    readonly cartItem: Locator;
    readonly itemTotal: Locator;
    readonly successMessage: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.errorMessage = page.locator('.error-message-container');
        this.finishButton = page.locator('#finish');
        this.cartItem = page.locator('.cart_item');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.successMessage = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
    }
    
    async navigateToCheckout() {
        await this.page.goto('/checkout-step-one.html');
    }
    async fillCheckoutForm(data: any) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.postalCodeInput.fill(data.postalCode);
    }

    async fillEmptyNameCheckoutForm(data: any) {
        await this.firstNameInput.fill('');
        await this.lastNameInput.fill(data.lastName);
        await this.postalCodeInput.fill(data.postalCode);
    }

    async fillEmptyLastNameCheckoutForm(data: any) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill('');
        await this.postalCodeInput.fill(data.postalCode);
    }

    async fillEmptyPostalCodeCheckoutForm(data: any) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.postalCodeInput.fill('');
    }

    async validateErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async submitCheckout() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async verifyCartItemTitle(expectedTitle: string) {
        const itemTitle = this.cartItem.locator('.inventory_item_name');
        await expect(itemTitle).toHaveText(expectedTitle);  
    }

    async verifyItemTotal(expectedTotal: number) {
        await expect(this.itemTotal).toContainText(expectedTotal.toString());
    }
    
    async verifySuccessMessage(expectedMessage: string) {
        await expect(this.successMessage).toHaveText(expectedMessage);
    }

    async goBackHome() {
        await this.backHomeButton.click();
    }
}