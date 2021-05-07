import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models/product';
import {MessengerService} from '../../../../services/messenger.service';
import {CartService} from '../../../../services/cart.service';
import {CartStore} from '../../../../services/stores/cart-store';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  productItem;
  // isExistInCart = false;

  quantity = 1;

  constructor(private msg: MessengerService,
              private cartService: CartService,
              private cartStore: CartStore) { }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.productItem.isExistInCart = true;
    let copyProduct = JSON.parse(JSON.stringify(this.productItem))
    delete copyProduct.qty
   delete copyProduct.isExistInCart
   delete copyProduct.cartId

    this.cartService.addProductToCart(copyProduct, this.productItem.qty).subscribe((ele) => {
      console.log(ele);
      this.productItem.cartId =ele.id
    });
  }

  increaseQuantity(){
   this.productItem.qty++;
   if (this.productItem.isExistInCart) {
    let copyProduct = JSON.parse(JSON.stringify(this.productItem))
    delete copyProduct.qty
    delete copyProduct.cartId
   delete copyProduct.isExistInCart
    this.updateCartItem({
      id: this.productItem.cartId,
      product: copyProduct,
      qty: this.productItem.qty,
    })
   }
  }
  updateCartItem(item){

    this.cartService.updateCartItem(item).subscribe((ele) => console.log('test'));
  }
  decreaseQuantity(){
    if (this.productItem.qty > 1) {
      this.productItem.qty--;
      if (this.productItem.isExistInCart) {
        let copyProduct = JSON.parse(JSON.stringify(this.productItem))
        delete copyProduct.qty
        delete copyProduct.cartId
       delete copyProduct.isExistInCart
        this.updateCartItem({
          id: this.productItem.cartId,
          product: copyProduct,
          qty: this.productItem.qty,
        })
       }
    }
  }
}
