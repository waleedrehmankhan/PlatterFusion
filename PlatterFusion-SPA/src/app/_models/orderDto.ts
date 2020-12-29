export class CreditCardInfoBindingModel {
  paymentSourceId: string;
  last4: string;
  maskedNumber: string;
  expiryMonth: number;
  expiryYear: number;
  name: string;
}

export class PaymentSouceBindingModel {
  tempTokenId: string;
}

export class PaymentCreateBindingModel {
  amount: number;
  email: string;
  cardholderName: string;
  stripeToken: string;
}

export class orderDetailModel {
  orders: Array<any>;
  subtotal: number;
  delivery: number;
  time: string;
}
