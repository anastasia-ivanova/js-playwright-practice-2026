import { Page, test, Locator } from "@playwright/test";
import { BillingAddress, PaymentMethod, PaymentInfo } from "../tests/test-data/test-data";

export class CheckoutPage{
    private page: Page;

    readonly signInText: Locator;
    readonly proceedToCheckoutButton: Locator;

    readonly countryDropdown: Locator;
    readonly postalCodeInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly houseNumberInput: Locator;

    readonly proceedToCheckoutButton2: Locator;
    readonly proceedToPaymentButton3: Locator;

    readonly paymentMethodDropdown: Locator;

    readonly cardNumberInput: Locator;
    readonly expirationDateInput: Locator;
    readonly cvvInput: Locator;
    readonly cardHolderNameInput: Locator;
    readonly finishButton: Locator;

    readonly paymentCompleteText: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
        this.proceedToCheckoutButton = page.getByTestId('proceed-2');
        this.signInText = page.locator('app-login');

        this.countryDropdown = page.getByTestId('country');
        this.postalCodeInput = page.getByTestId('postal_code');
        this.streetInput = page.getByTestId('street');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.houseNumberInput = page.getByTestId('house_number');

        this.proceedToCheckoutButton2 = page.getByTestId('proceed-2');

        this.proceedToPaymentButton3 = page.getByTestId('proceed-3');
        this.paymentMethodDropdown = page.getByTestId('payment-method');

        this.cardNumberInput = page.getByTestId('credit_card_number');
        this.expirationDateInput = page.getByTestId('expiration_date');
        this.cvvInput = page.getByTestId('cvv');
        this.cardHolderNameInput = page.getByTestId('card_holder_name');
        this.finishButton = page.getByTestId('finish');
        this.paymentCompleteText = page.getByTestId('payment-success-message');
    }


    async clickProceedToCheckout2(): Promise<void> {
        await test.step('Click on proceed to billing address page: ', async () => {
            await this.proceedToCheckoutButton2.click();
        });
    }

    async fillBillingAddress(billingAddress: BillingAddress): Promise<void> {

    await test.step('Fill billing information', async () => {

        await this.countryDropdown.selectOption(billingAddress.country);
        await this.postalCodeInput.fill(billingAddress.postalCode);
        await this.streetInput.fill(billingAddress.street);
        await this.cityInput.fill(billingAddress.city);
        await this.stateInput.fill(billingAddress.state);
        await this.houseNumberInput.fill(billingAddress.houseNumber);
    });
}
async proceedToPayment(): Promise<void> {

    await test.step('Proceed to payment step', async () => {
        await this.proceedToPaymentButton3.click();
    });
}

async selectPaymentMethod(paymentMethod: PaymentMethod): Promise<void> {
    await this.paymentMethodDropdown.selectOption(paymentMethod);
}

async fillInPaymentInfo(paymentInfo: PaymentInfo): Promise<void> {

    await test.step('Fill payment information', async () => {
        await this.cardNumberInput.fill(paymentInfo.cardNumber);
        await this.expirationDateInput.fill(paymentInfo.expirationDate);
        await this.cvvInput.fill(paymentInfo.cvv);
        await this.cardHolderNameInput.fill(paymentInfo.cardHolderName);
        await this.finishButton.click();
    });
}

}


    
