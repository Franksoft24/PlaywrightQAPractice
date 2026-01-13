import {test, expect} from '@playwright/test';
import {LoginForm} from '../pages/loginForm';
import loginData from '../Data/loginData.json';

let loginForm: LoginForm;
let loginData_ = loginData;

/// Login Tests to validate a successful login.
test.describe('Login testing', () => {
  
  test.beforeEach(async ({page}) => {
    loginForm = new LoginForm(page);
    await loginForm.navigateToLogin();
  });

  test('Successful Login', async ({page}) => {
    await loginForm.login(loginData_.userName, loginData_.password);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

});

/// Login negative tests, to validate the error messages
test.describe('Login negative tests',() => {

  test.beforeEach(async ({page}) => {
    loginForm = new LoginForm(page);
    await loginForm.navigateToLogin();
  }); 

  test('Login with Invalid Username', async () => {
    await loginForm.login(loginData_.invalidUserName, loginData_.password);
    await loginForm.expectErrorMessage(loginData_.errorMessages.invalidCredentials);
  });

  test('Login with Invalid Password', async () => {
    await loginForm.login(loginData_.userName, loginData_.invalidPassword);
    await loginForm.expectErrorMessage(loginData_.errorMessages.invalidCredentials);
  });

  test('Login with Empty Credentials', async () => {
    await loginForm.clickLogin();
    await loginForm.expectErrorMessage(loginData_.errorMessages.missingUsername); //It's the same error message
  });

  test('Login with Empty Username', async () => { 
    await loginForm.enterPassword(loginData_.password);
    await loginForm.clickLogin();
    await loginForm.expectErrorMessage(loginData_.errorMessages.missingUsername);
  });

  test('Login with Empty Password', async () => {
    await loginForm.enterUsername(loginData_.userName);
    await loginForm.clickLogin();
    await loginForm.expectErrorMessage(loginData_.errorMessages.missingPassword);
  });

  test('Login with Locked Out User', async () => {
    await loginForm.login(loginData_.lockedOutUser, loginData_.password);
    await loginForm.expectErrorMessage(loginData_.errorMessages.lockedOutUser);
  });

});