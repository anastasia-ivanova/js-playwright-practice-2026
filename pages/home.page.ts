import { Page, test, Locator } from "@playwright/test";

export class HomePage{
    private page: Page;

    readonly productCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCard = page.getByTestId('product-name');
    }

    async clickOnProductCard(productName:string): Promise<void> {
        await test.step('Click on product card by product name: ' + productName, async () => {
            await this.productCard
            .filter({ hasText: productName }).click();
        });

    }

    async goTo(): Promise<void>{
        await test.step('go to home page', async () => {
            await this.page.goto('/');
        });
    }
}