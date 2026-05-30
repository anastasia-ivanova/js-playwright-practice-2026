import { Page, test, Locator } from "@playwright/test";

export class ProductPage{
    private page: Page;

    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly productAddedMessage: Locator;
   
    //header part
    readonly cartButton: Locator;
    readonly cartQuality: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('unit-price');
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.productAddedMessage = page.getByRole('alert', { name: 'Product added to shopping' });
        this.cartButton = page.locator('[data-test="nav-cart"]');
        this.cartQuality = page.locator('[data-test="cart-quantity"]');

    }

    async clickAddToCart(): Promise<void>{
        await test.step('click add to cart on the product page', async () => {
            await this.addToCartButton.click();
        });
    }

    async clickGoToCart(): Promise<void>{
        await test.step('click proceed to cart', async () => {
            await this.cartButton.click();
        })
    }
}