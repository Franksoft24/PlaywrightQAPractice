import {test, expect} from '@playwright/test';
import {LoginForm} from '../pages/loginForm';

test.describe('Login testing', () => {
  let loginForm: LoginForm;

  test.beforeEach(async ({page}) => {
    loginForm = new LoginForm(page);
    await loginForm.navigateToLogin();
  });

  test('Successful Login', async ({page}) => {
    await loginForm.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

});
test.describe('Login negative tests',() => {
  let loginForm: LoginForm;
  
  test.beforeEach(async ({page}) => {
    loginForm = new LoginForm(page);
    await loginForm.navigateToLogin();
  }); 
  
  test('Login with Invalid Username', async () => {
    await loginForm.login('whatever_user', 'secret_sauce');
    await loginForm.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with Invalid Password', async () => {
    await loginForm.login('standard_user', '1111');
    await loginForm.expectErrorMessage('Epic sadface: Username and password do not match any user in this   service');
  });

  test('Login with Empty Credentials', async () => {
    await loginForm.clickLogin();
    await loginForm.expectErrorMessage('Epic sadface: Username is required');
  });

})