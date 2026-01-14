import { test } from '@playwright/test';
import { InventoryPO } from '../pages/InventoryPO';
import loginData from '../Data/loginData.json';
import inventoryData from '../Data/inventoryData.json';
import { LoginFormPO } from '../pages/LoginFormPO';

let inventoryPage: InventoryPO;
let loginForm: LoginFormPO;
let loginData_ = loginData;
let inventoryData_ = inventoryData;

/// Inventory Tests to validate inventory page access post login.
test.describe('Inventory page tests', () => {
  
  test.beforeEach(async ({page}) => {
    loginForm = new LoginFormPO(page);
    inventoryPage = new InventoryPO(page);
    await loginForm.navigateToLogin();
    await loginForm.login(loginData_.userName, loginData_.password);
  });

  test('Add item to Cart from Inventory Page', async ({page}) => {
    await inventoryPage.navigateToInventory();
    await inventoryPage.addToCart(inventoryData_.products[0].title);
    await inventoryPage.cartCountExpect(1);
  });

  test('Remove item from Cart in Inventory Page', async ({page}) => {
    await inventoryPage.navigateToInventory();
    await inventoryPage.addToCart(inventoryData_.products[2].title);
    await inventoryPage.removeFromCart(inventoryData_.products[2].title);
    await inventoryPage.cartCountExpect(0);
  });

  test('Add multiple items to Cart from Inventory Page', async ({page}) => {
    await inventoryPage.navigateToInventory();
    for (const product of inventoryData_.products) {
      await inventoryPage.addToCart(product.title);
    }
    await inventoryPage.cartCountExpect(inventoryData_.products.length);
  });

});
