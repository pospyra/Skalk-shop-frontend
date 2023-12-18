import { Component } from '@angular/core';
import { OrderDTO } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.scss']
})
export class ManagerPanelComponent {
  constructor(private orderService: OrderService){}
  ngOnInit(){
    this.loadOrders();
  }
  orders: OrderDTO[] = [];

  dowladContract(orderId: number){
    this.orderService.downloadContract(orderId);
  }
  private loadOrders(){
    this.orderService.getOrders().subscribe((data) =>{
      this.orders = data;
    })
  }
}
