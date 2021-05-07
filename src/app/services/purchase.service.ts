import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {productsUrl, purchasesUrl} from '../../config/api';
import {map} from 'rxjs/operators';
import {Address} from '../models/address';
import {User} from '../models/user';
import {CartStore} from './stores/cart-store';
import {Purchase} from '../models/purchase';
import { PaymentDetails } from '../models/payment-details';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private cartStore: CartStore)  {
  }

  loadPurchases(): Observable<Purchase[]> {
    return this.http.get<any>(purchasesUrl);
  }

  postPurchase(user: User, address: Address , paymentDetails : PaymentDetails): Observable<any> {
    const purchaseBody = this.buildPurchaseBody(user, address ,paymentDetails);
    return this.http.post<any>(purchasesUrl, purchaseBody);
  }

  private buildPurchaseBody(user: User, address: Address ,paymentDetails : PaymentDetails) {
      const items = this.cartStore.getCurrentCart();

      return new Purchase(user, address, items , paymentDetails , new Date());
  }
}
