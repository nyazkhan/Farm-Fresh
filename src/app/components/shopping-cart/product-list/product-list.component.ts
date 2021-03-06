import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/models/cart-item';
import { CartStore } from 'src/app/services/stores/cart-store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: Product[];
  categoryFilter = 'all';
  searchData: FormGroup;
  cartItems$: Observable<CartItem[]>;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartStore: CartStore,
    private router: Router) {
    this.cartItems$ = this.cartStore.cartItems$;

  }

  ngOnInit(): void {

    this.productService.loadProducts().subscribe(prodData => {
      // this.productsList = prodData
      this.cartItems$.subscribe((cartItems) => {
      prodData.forEach(element => {
        element['qty'] = 1
        element['isExistInCart'] = false
        if(cartItems && cartItems.length>0){
          cartItems.forEach(cItem => {

            if (element.id == cItem.product.id) {
             
              element['qty'] = cItem.qty
              element['cartId'] =  cItem.id
              element['isExistInCart'] = true
            }
          })
        }
        })
              this.productsList = prodData

      })
    })
    this.searchData = new FormGroup({
      search: new FormControl(''),
    });

    this.searchData.valueChanges.subscribe(val => {
      if (val.search === '') {
        this.productsList = this.route.snapshot.data['products'];
      }
    })
  }


  changeCategoryFilter(newCategory: string) {
    this.categoryFilter = newCategory;
    console.log('Showing');
  }

  search(productName: string) {
    this.productsList = this.productsList.filter(product => product.name.startsWith(productName));
  }
}
