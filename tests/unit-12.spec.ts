import { test, expect } from '../fixtures/fixtures'
import { PowerTools } from './test-data/catalog-categiries.enum';

test('Unit 12 - Test 1: not logged In: Verify user can add product to cart', async ({ app }) => {
    const productName = 'Slip Joint Pliers';
    const expectedProductPrice = '9.17';

    await app.homePage.goTo();

    await app.homePage.clickOnProductCard(productName);
    await expect(app.page).toHaveURL(/\/product\/.+/);
    await expect(app.productPage.productName).toContainText(productName);
    await expect(app.productPage.productPrice).toContainText(expectedProductPrice);

    await app.productPage.clickAddToCart();

    await expect(app.productPage.productAddedMessage).toBeVisible();
    await expect(app.productPage.productAddedMessage).toContainText('Product added to shopping cart');
    await expect(app.productPage.productAddedMessage).toBeHidden({ timeout: 8000 });

    await expect(app.productPage.cartQuality).toContainText('1');

    await app.productPage.clickGoToCart();

    await expect(app.page).toHaveURL('/checkout');
    await expect(app.cartPage.productInTheCartCell).toHaveCount(1);
    await expect(app.cartPage.productInTheCartCell).toContainText(productName);
    await expect(app.cartPage.proceedToCheckoutButton).toBeVisible();

});

[
  { option: 'Name (A - Z)', order: 'asc' },
  { option: 'Name (Z - A)', order: 'desc' },
].forEach(({ option, order }) => {
  test(`Unit 12 - Test 2,3: not logged in: Verify sorting by name ${order}`, async ({ app }) => {
    await app.homePage.goTo();

    await app.homePage.selectSortingType(option);

    const productNames = await app.homePage.productCard.allInnerTexts();

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
  test(`Unit 12 - Test 4,5: Verify user can perform sorting by price ${order}`, async ({ app }) => {
    await app.homePage.goTo();
    await app.homePage.selectSortingType(option);

    const priceTexts = await app.homePage.productPrices.allInnerTexts();
    const cleanPrices = priceTexts.map(price => parseFloat(price.replace('$', '')));

    let sorted = [...cleanPrices].sort((a, b) => a - b);
    if (order === 'desc') {
        sorted = sorted.reverse();
    }
    expect(cleanPrices).toEqual(sorted);
  });
});

test(`Unit 12 - Test 6: Verify user can perform filtering by category`, async ({ app }) => {
    await app.homePage.goTo();
    await app.homePage.selectPowerToolsCategory(PowerTools.Sander);
    //next check is insead of waiter
    await expect(app.homePage.productCard.first()).toContainText('Sander');
    const results = await app.homePage.productCard.allInnerTexts();
    expect(results.every(name => name.includes('Sander'))).toBe(true);
});


