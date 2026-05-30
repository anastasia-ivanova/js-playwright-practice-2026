import { Page, test, Locator } from "@playwright/test";

export class CartPage{
    private page: Page;

    readonly productInTheCartCell: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly productPriceCell: Locator;
     
    constructor(page: Page) {
        this.page = page;
        
        this.proceedToCheckoutButton = page.getByTestId('proceed-1');
        this.productInTheCartCell = page.getByTestId('product-title');
        this.productPriceCell = page.getByTestId('line-price');
    }

    async clickProceedToCheckout(): Promise<void> {
        await test.step('Click on proceed to checkout: ', async () => {
            await this.proceedToCheckoutButton.click();
        });
    }
}