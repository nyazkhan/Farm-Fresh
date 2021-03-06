import {Product} from './product';

export class CartItem {
  id: number;
  product: Product;
  qty: number;

  constructor(product: Product, qty = 1, id?) {
    this.id = id;
    this.product = product;
    this.qty = qty;
  }
}
