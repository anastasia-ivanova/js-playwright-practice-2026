import { test, expect } from '@playwright/test';

test('Unit 10 - first test', async ({ page }) => {
    await test.step('go to login page', async step => {
        await page.goto('auth/login')
    });
    await test.step('Fill login info and press login', async step => {
        await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
        await page.getByTestId('password').fill('welcome01');
        await page.getByTestId('login-submit').click()
    });
    await test.step('make final checks', async step => {
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
        await expect(page.getByTestId('page-title')).toContainText('My account');
        await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
    });
});