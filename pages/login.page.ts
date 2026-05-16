import { Page, test, Locator } from "@playwright/test";

export class LoginPage{
    private page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // initialize locators once
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
    }

    async login(email:string, password:string): Promise<void> {
        await test.step('Fill login info and press login', async () => {
            await this.page.getByTestId('email').fill(email);
            await this.page.getByTestId('password').fill(password);
            await this.page.getByTestId('login-submit').click();
        });

    }

    async goTo(){
        await test.step('go to login page', async () => {
            await this.page.goto('auth/login');
        });
    }
}