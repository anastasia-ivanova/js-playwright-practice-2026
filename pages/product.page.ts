import { Page, Locator } from "@playwright/test";

export class ProductPage{
    private page: Page;

    readonly productName: Locator;
    readonly productPrice: Locator;
    

    constructor(page: Page) {
        this.page = page;

        // initialize locators once
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('unit-price');
    }

    
}