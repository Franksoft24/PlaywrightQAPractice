import {test} from '@playwright/test';
import { CheckOutPO } from '../pages/CheckoutPO';
import loginData from '../Data/loginData.json';
import checkoutData from '../Data/checkoutData.json';
import { InventoryPO } from '../pages/InventoryPO';
import inventoryData from '../Data/inventoryData.json';
import { LoginPO } from '../pages/LoginPO';

let checkoutPage: CheckOutPO;
let loginForm: LoginPO;
let inventoryPage: InventoryPO;
let loginData_ = loginData;
let checkoutData_ = checkoutData;
let inventoryData_ = inventoryData;

/// Checkout Tests to validate the checkout process.
test.describe('Full checkout page tests', () => {

    const fixedProduct = 4; // Using the 5th product for checkout tests
    test.beforeEach(async ({page}) => {
        loginForm = new LoginPO(page);
        inventoryPage = new InventoryPO(page);
        checkoutPage = new CheckOutPO(page);
        await loginForm.navigateToLogin(); // Navigate to login page
        await loginForm.login(loginData_.userName, loginData_.password); // Login before each test
        await inventoryPage.navigateToInventory(); // Ensure we are on inventory page before each test
        await inventoryPage.addToCart(inventoryData_.products[fixedProduct].title); // Add a fixed product to cart
        await inventoryPage.goToCart();// Go to cart page
        await checkoutPage.navigateToCheckout(); // Navigate to checkout page
    });

    test('Successfully full checkout', async ({page}) => {
        await checkoutPage.fillCheckoutForm(checkoutData_.form);
        await checkoutPage.submitCheckout();
        await checkoutPage.verifyCartItemTitle(inventoryData_.products[fixedProduct].title);
        await checkoutPage.verifyItemTotal(inventoryData_.products[fixedProduct].price);
        await checkoutPage.finishCheckout();
        await checkoutPage.verifySuccessMessage(checkoutData_.successMessage);
        await checkoutPage.goBackHome();
    });
});

test.describe('Checkout negative tests', () => {

    test.beforeEach(async ({page}) => {
        loginForm = new LoginPO(page);
        inventoryPage = new InventoryPO(page);
        checkoutPage = new CheckOutPO(page);
        await loginForm.navigateToLogin(); // Navigate to login page
        await loginForm.login(loginData_.userName, loginData_.password); // Login before each test
        await inventoryPage.navigateToInventory(); // Ensure we are on inventory page before each test
        await inventoryPage.addToCart(inventoryData_.products[0].title); // Add a product to cart
        await inventoryPage.goToCart();// Go to cart page
        await checkoutPage.navigateToCheckout(); // Navigate to checkout page
    });

    test('Checkout with empty First Name', async ({page}) => {
        await checkoutPage.fillEmptyNameCheckoutForm(checkoutData_.form);
        await checkoutPage.submitCheckout();
        await checkoutPage.validateErrorMessage(checkoutData_.errorMessages.firstNameError);
    });

    test('Checkout with empty Last Name', async ({page}) => {
        await checkoutPage.fillEmptyLastNameCheckoutForm(checkoutData_.form);
        await checkoutPage.submitCheckout();
        await checkoutPage.validateErrorMessage(checkoutData_.errorMessages.lastNameError);
    });

    test('Checkout with empty Postal Code', async ({page}) => {
        await checkoutPage.fillEmptyPostalCodeCheckoutForm(checkoutData_.form);
        await checkoutPage.submitCheckout();
        await checkoutPage.validateErrorMessage(checkoutData_.errorMessages.postalCodeError);
    });

});    