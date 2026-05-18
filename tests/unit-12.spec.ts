import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { PowerTools } from './test-data/catalog-categiries.enum';

test('Unit 12 - Test 1: Verify user can add product to cart', async ({ page }) => {
    const productName = 'Slip Joint Pliers';
    const expectedProductPrice = '9.17';

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.goTo();

    await homePage.clickOnProductCard(productName);
    await expect(page).toHaveURL(/\/product\/.+/);
    await expect(productPage.productName).toContainText(productName);
    await expect(productPage.productPrice).toContainText(expectedProductPrice);

    await productPage.clickAddToCart();

    await expect(productPage.productAddedMessage).toBeVisible();
    await expect(productPage.productAddedMessage).toContainText('Product added to shopping cart');
    await expect(productPage.productAddedMessage).toBeHidden({ timeout: 8000 });

    await expect(productPage.cartQuality).toContainText('1');

    await productPage.clickGoToCart();

    await expect(page).toHaveURL('/checkout');
    await expect(cartPage.productInTheCartCell).toHaveCount(1);
    await expect(cartPage.productInTheCartCell).toContainText(productName);
    await expect(cartPage.proceedToCheckoutButton).toBeVisible();

});

[
  { option: 'Name (A - Z)', order: 'asc' },
  { option: 'Name (Z - A)', order: 'desc' },
].forEach(({ option, order }) => {
  test(`Unit 12 - Test 2,3: Verify sorting by name ${order}`, async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.goTo();

    await homePage.selectSortingType(option);

    const productNames = await homePage.productCard.allInnerTexts ();

    let sorted = [...productNames].sort();
    if (order === 'desc') {
      sorted = sorted.reverse();
    }

    expect(productNames).toEqual(sorted);
    });
});


[
  { option: 'Price (High - Low)', order: 'desc' },
  { option: 'Price (Low - High)', order: 'asc' },
].forEach(({ option, order }) => {
  test(`Unit 12 - Test 4,5: Verify user can perform sorting by price ${order}`, async ({ page }) => {
    const homePage = new HomePage(page);   

    await homePage.goTo();
    await homePage.selectSortingType(option);

    const priceTexts = await homePage.productPrices.allInnerTexts();
    const cleanPrices = priceTexts.map(price => parseFloat(price.replace('$', '')));

    let sorted = [...cleanPrices].sort((a, b) => a - b);
    if (order === 'desc') {
        sorted = sorted.reverse();
    }
    expect(cleanPrices).toEqual(sorted);
  });
});

test(`Unit 12 - Test 6: Verify user can perform filtering by category`, async ({ page }) => {
    const homePage = new HomePage(page);   

    await homePage.goTo();
    await homePage.selectPowerToolsCategory(PowerTools.Sander);
    await expect(homePage.productCard.first()).toContainText('Sander') //adding this as a waiter
    const results = await homePage.productCard.allInnerTexts();
    expect(results.every(name => name.includes('Sander'))).toBe(true);
});


