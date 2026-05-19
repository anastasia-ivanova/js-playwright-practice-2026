import { Page, test, Locator } from "@playwright/test";
import { PowerTools } from "../tests/test-data/catalog-categiries.enum";

export class HomePage{
    private page: Page;

    readonly productCard: Locator;
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCard = page.getByTestId('product-name');
        this.sortDropdown = page.getByTestId('sort');
        this.productPrices = page.getByTestId('product-price');
    }

    async clickOnProductCard(productName:string): Promise<void> {
        await test.step('Click on product card by product name: ' + productName, async () => {
            await this.productCard
            .filter({ hasText: productName }).click();
        });

    }

    async selectSortingType(sortingType:string): Promise<void> {
        await test.step('Select sorting option as: ' + sortingType, async () => {
            await this.sortDropdown.selectOption(sortingType);
        })
        await this.waitForProductsPageUpdate();    
    }

    async goTo(): Promise<void>{
        await test.step('go to home page', async () => {
            await this.page.goto('/');
        });
    }

    async selectPowerToolsCategory(category:PowerTools): Promise<void>{
        

        await test.step('Select filtering option as: ' + category, async () => {
            await this.page.getByLabel(category).check(); 
            });
        await this.waitForProductsPageUpdate();    
        
    }

    async waitForProductsPageUpdate(): Promise<void> {
    await this.page.waitForResponse(response =>
        response.url().includes('/products') &&
        response.request().method() === 'GET' &&
        response.status() === 200
    );
}

    
}