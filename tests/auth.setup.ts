import { test as setup, expect } from '@playwright/test';
import { loginInfo } from './test-data/test-data';
import { LoginPage } from '../pages/login.page';


setup('logging in as test user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const authFile = 'playwright/.auth/logged_user.json'; 
    await loginPage.goTo();
    await loginPage.login(loginInfo.email, loginInfo.password);
    await expect(page).toHaveURL('/account');

    await page.context().storageState({ path: authFile });
});