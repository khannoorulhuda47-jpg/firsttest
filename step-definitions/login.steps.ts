import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../src/pages/LoginPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
});

After(async () => {
  await page.close();
  await browser.close();
});

Given('the user is on the login page', async () => {
  await loginPage.navigateToLoginPage();
  await loginPage.verifyLoginPageLoaded();
});

When('the user enters valid credentials', async () => {
  await loginPage.enterValidCredentials();
});

When('the user enters invalid credentials', async () => {
  await loginPage.enterInvalidCredentials();
});

When('the user clicks the login button', async () => {
  await loginPage.clickLoginButton();
});

Then('the user should be redirected to the dashboard', async () => {
  await loginPage.verifyDashboardRedirect();
});

Then('an error message should be displayed', async () => {
  await loginPage.verifyErrorMessageDisplayed();
});
