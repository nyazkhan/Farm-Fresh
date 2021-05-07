import {Address} from './address';
import {User} from './user';
import {CartItem} from './cart-item';
import { PaymentDetails } from './payment-details';

export class Purchase {
  personal: User;
  address: Address;
  items: CartItem [];
  purchaseDate: Date;
  paymentDetails: PaymentDetails;

  constructor(user: User, address: Address, items: CartItem [], paymentDetails: PaymentDetails ,date:Date) {
    this.personal = user;
    this.address = address;
    this.items = items;
   this.purchaseDate  = date,
   this.paymentDetails = paymentDetails
  }
}
