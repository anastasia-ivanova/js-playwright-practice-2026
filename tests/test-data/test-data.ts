export const loginInfo = {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
    name: 'Jane Doe'
}

// export const loginInfo = {
//     email: 'rcat3447@gmail.com',
//     password: 'WelcomeAuto01!',
//     name: 'Anastasiia Ivanova'
// }

export const billingAddress = {
    country: 'UA',
    postalCode: '111111',
    street: 'test str',
    city: 'test city',
    state: 'test state',
    houseNumber: '11',
};

export type BillingAddress = {
    country: string;
    postalCode: string;
    street: string;
    city: string;
    state: string;
    houseNumber: string;
};

export enum PaymentMethod {
    BankTransfer = 'bank-transfer',
    CashOnDelivery = 'cash-on-delivery',
    CreditCard = 'credit-card',
    BuyNowPayLater = 'buy-now-pay-later',
    GiftCard = 'gift-card',
};

export type PaymentInfo = {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;
};

export const paymentInfo: PaymentInfo = {
    cardNumber: '4444-3333-2222-1111',
    expirationDate: '12/2029',
    cvv: '111',
    cardHolderName: 'Anastasiia Ivanova',
};

