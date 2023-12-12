import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroments.prod';
import { NewItemCartDTO } from '../models/shopping-cart/new-item-cart';
import { ShoppingCartDTO } from '../models/shopping-cart/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl = `${environment.host}/shoppingCart`;

  constructor(private _http: HttpClient) { }

  addItemToCart(newItem?: NewItemCartDTO) {
    return this._http.post(`${this.baseUrl}`, newItem);
  }

  getShoppingCart() {
    return this._http.get<ShoppingCartDTO>(`${this.baseUrl}`);
  }
}
