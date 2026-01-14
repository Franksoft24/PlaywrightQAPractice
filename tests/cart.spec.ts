import { test, expect } from "@playwright/test";
import { CartPO } from "../pages/CartPO";
import { InventoryPO } from "../pages/InventoryPO";
import loginData from '../Data/loginData.json';
import inventoryData from '../Data/inventoryData.json';
import { LoginPO } from "../pages/LoginPO";

let cartPage: CartPO;
let inventoryPage: InventoryPO;
let loginForm: LoginPO;
let loginData_ = loginData;
let inventoryData_ = inventoryData;

/// Cart Tests to validate cart functionalities.
test.describe('Cart page tests', () => {
  
  test.beforeEach(async ({page}) => {
    loginForm = new LoginPO(page);
    inventoryPage = new InventoryPO(page);
    cartPage = new CartPO(page);
    await loginForm.navigateToLogin(); // Navigate to login page
    await loginForm.login(loginData_.userName, loginData_.password); // Perform login
    await inventoryPage.navigateToInventory(); // Navigate to inventory page
    await inventoryPage.addToCart(inventoryData_.products[1].title); // Adding one item to cart before each test
    await inventoryPage.goToCart(); // Navigate to cart page
  });

  test('Remove item from Cart in Cart Page', async ({page}) => {
    await cartPage.removeItem(inventoryData_.products[1].title);
    await inventoryPage.cartCountExpect(0);
  });

  test('Continue Shopping from Cart Page', async ({page}) => {
    await cartPage.continueShopping();
    await inventoryPage.cartCountExpect(1);
  });

  test('Proceed to Checkout from Cart Page', async ({page}) => {
    await cartPage.proceedToCheckout();
    await test.expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

});