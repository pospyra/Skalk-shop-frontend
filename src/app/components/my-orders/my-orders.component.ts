import { Component } from '@angular/core';
import { OrderDTO } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  constructor(private orderService: OrderService){}
  ngOnInit(){
    this.loadOrders();
  }
  orders: OrderDTO[] = [];

  dowladContract(orderId: number){
    this.orderService.downloadContract(orderId);
  }
  private loadOrders(){
    this.orderService.getOrdersByCurrentUser().subscribe((data) =>{
      this.orders = data;
    })
  }
}
