import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroments.prod';
import { ProductDTO } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `${environment.host}/product`;

  constructor(private _http: HttpClient) { }

  getProducts(itemName?: string) {
    return this._http.get<ProductDTO[]>(`${this.baseUrl}?itemName=${itemName}`);
  }
}
