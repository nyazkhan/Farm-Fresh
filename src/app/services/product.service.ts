import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {productsUrl, purchasesUrl} from '../../config/api';
import {AuthStore} from './stores/auth.store';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private auth: AuthStore) { }

  loadProducts(): Observable<Product[]> {

    return this.http.get<any>(productsUrl, { withCredentials: true}).pipe(
      map(result => result)
    );
  }

  uploadProduct(name: string, price: string, category: string, file: File) {
    // const formData: FormData = new FormData();
    let obj = {
      
      "name": name,
      "description": name,
      "imageUrl": "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png",
      "price": price,
      "categories": [
        "all",
        category
      ]
    }
    // formData.append('image', file, file.name);
    // formData.append('name', name);
    // formData.append('categories', category);
    // formData.append('price', price);

    return this.http.post(productsUrl , obj);
  }
}
