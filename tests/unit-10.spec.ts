import { test, expect } from '../fixtures/fixtures'
import { billingAddress, loginInfo, PaymentMethod , paymentInfo} from './test-data/test-data';

test('Unit 13 - first test with page objects', async ({ loggedInApp }) => {
 
    await loggedInApp.page.goto('/account');

    await test.step('make final checks', async () => {
        await expect(loggedInApp.page).toHaveURL('/account');
        await expect(loggedInApp.accountPage.pageTitle).toContainText('My account');
        await expect(loggedInApp.accountPage.navMenu).toContainText(loginInfo.name);
    });
});

test('Unit 11 - Test 2: Verify user can view product details, then added loggedIn fixture', async ({ loggedInApp }) => {
    const productName = 'Combination Pliers';
    const expectedProductPrice = '14.15';
    await loggedInApp.homePage.goTo();
    await loggedInApp.homePage.clickOnProductCard(productName);

    await expect(loggedInApp.page).toHaveURL(/\/product\/.+/);
    await expect(loggedInApp.productPage.productName).toContainText(productName);
    await expect(loggedInApp.productPage.productPrice).toContainText(expectedProductPrice);
});

test('Unit 13 - Test 1: logged In: Verify complete buy process', async ({ loggedInApp }) => {

    await loggedInApp.homePage.goTo();

    const productName = await loggedInApp.homePage.productCard.nth(2).innerText();
    const expectedProductPrice = await loggedInApp.homePage.getCleanProductPrice(2);
    await loggedInApp.homePage.clickOnProductCard(productName);
    await loggedInApp.productPage.clickAddToCart();
    await loggedInApp.productPage.clickGoToCart();

    await expect(loggedInApp.page).toHaveURL('/checkout');
    await expect(loggedInApp.cartPage.productInTheCartCell).toHaveCount(1);
    await expect(loggedInApp.cartPage.productInTheCartCell).toContainText(productName);
    await expect(loggedInApp.cartPage.productPriceCell).toContainText(expectedProductPrice)
    await loggedInApp.cartPage.proceedToCheckoutButton.click();

    console.log(loggedInApp.checkoutPage.signInText.innerText());

    await expect(loggedInApp.checkoutPage.signInText).toContainText(', you are already logged in. You can proceed to checkout.');
    
    await expect(loggedInApp.checkoutPage.proceedToCheckoutButton2).toBeVisible();     
    await loggedInApp.checkoutPage.clickProceedToCheckout2();

    await loggedInApp.checkoutPage.fillBillingAddress(billingAddress);


    await expect(loggedInApp.checkoutPage.proceedToPaymentButton3).toBeVisible();     
    await loggedInApp.checkoutPage.proceedToPayment();

    await loggedInApp.checkoutPage.selectPaymentMethod(PaymentMethod.CreditCard);
    await loggedInApp.checkoutPage.fillInPaymentInfo(paymentInfo);
    await expect(loggedInApp.checkoutPage.paymentCompleteText).toContainText('Payment was successful');
});

