import { Page, Locator } from "@playwright/test";

export class AccountPage {
    private page: Page;

    readonly pageTitle: Locator;
    readonly navMenu: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.getByTestId('page-title');
        this.navMenu = page.getByTestId('nav-menu');
    }
}