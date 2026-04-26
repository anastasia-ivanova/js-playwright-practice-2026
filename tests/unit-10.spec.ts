import { test, expect } from '@playwright/test';

test('Unit 10 - first test', async ({ page }) => {
  await page.goto('auth/login');
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toContainText('My account');
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});