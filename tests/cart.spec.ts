import { test, expect } from "@playwright/test";
import { CartPO } from "../pages/CartPO";
import { InventoryPO } from "../pages/InventoryPO";
import { LoginFormPO } from "../pages/LoginFormPO";
import loginData from '../Data/loginData.json';
import inventoryData from '../Data/inventoryData.json';

let cartPage: CartPO;
let inventoryPage: InventoryPO;
let loginForm: LoginFormPO;
let loginData_ = loginData;
let inventoryData_ = inventoryData;

/// Cart Tests to validate cart functionalities.
test.describe('Cart page tests', () => {
  
  test.beforeEach(async ({page}) => {
    loginForm = new LoginFormPO(page);
    inventoryPage = new InventoryPO(page);
    cartPage = new CartPO(page);
    await loginForm.navigateToLogin();
    await loginForm.login(loginData_.userName, loginData_.password);
    await inventoryPage.navigateToInventory();
    await inventoryPage.addToCart(inventoryData_.products[1].title);
  });

  test('Remove item from Cart in Cart Page', async ({page}) => {
    await inventoryPage.goToCart();
    await cartPage.removeItem(inventoryData_.products[1].title);
    await inventoryPage.cartCountExpect(0);
  });

  test('Continue Shopping from Cart Page', async ({page}) => {
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await inventoryPage.cartCountExpect(1);
  });

  test('Proceed to Checkout from Cart Page', async ({page}) => {
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await test.expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

});