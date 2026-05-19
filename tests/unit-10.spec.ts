import { test, expect } from '@playwright/test';
import { loginInfo } from './test-data/login-info';
import { AccountPage } from '../pages/account.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test('Unit 13 - first test with page objects', async ({ page }) => {
    const accountPage = new AccountPage(page);

    //skip Login
    await page.goto('/account');

    await test.step('make final checks', async () => {
        await expect(page).toHaveURL('/account');
        await expect(accountPage.pageTitle).toContainText('My account');
        await expect(accountPage.navMenu).toContainText(loginInfo.name);
    });
});

test('Unit 11 - Test 2: Verify user can view product details', async ({ page }) => {
    const productName = 'Combination Pliers';
    const expectedProductPrice = '14.15';

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goTo();
    await homePage.clickOnProductCard(productName);

    await expect(page).toHaveURL(/\/product\/.+/);
    await expect(productPage.productName).toContainText(productName);
    await expect(productPage.productPrice).toContainText(expectedProductPrice);
});

