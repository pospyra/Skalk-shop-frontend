import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroments.prod';
import { CreateOrderDTO } from '../models/order/new-order';
import { OrderDTO } from '../models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = `${environment.host}/order`;

  constructor(private _http: HttpClient) { }

  placeOrder(newOrder?: CreateOrderDTO) {
    return this._http.post(`${this.baseUrl}`, newOrder);
  }

  getOrdersByCurrentUser(){
    return this._http.get<OrderDTO[]>(`${this.baseUrl}/by-current-user`);
  }

  getOrders(){
    return this._http.get<OrderDTO[]>(`${this.baseUrl}`);
  }

  downloadContract(orderId: number): void {
    const url = `${this.baseUrl}/download-contract/${orderId}`;
    this._http.get(url, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'contract.pdf';
        downloadLink.click();
      }, error => {
        console.error('Failed to download contract:', error);
      });
  }
}

