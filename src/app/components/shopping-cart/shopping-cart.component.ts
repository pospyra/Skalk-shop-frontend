import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateOrderDTO } from 'src/app/models/order/new-order';
import { ItemCartDTO } from 'src/app/models/shopping-cart/itemCart';
import { ShoppingCartDTO } from 'src/app/models/shopping-cart/shopping-cart';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  cart: ShoppingCartDTO = {
    id: 0,
    totalPrice: 0,
    itemShoppingCarts: []
  };
  isLoading: boolean = true;
  orderDetails: CreateOrderDTO = {
    companyName: undefined,
    inn: undefined,
    kpp: undefined,
    postCode: undefined,
    address: undefined
  };

  constructor(private cartService: ShoppingCartService, private orderService: OrderService) { }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.cartService.getShoppingCart()
      .subscribe(
        (data: ShoppingCartDTO) => {
          this.cart = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching products:', error);
          this.isLoading = false;
        }
      );
  }

  placeOrder() {

    // Pass orderData to the service method for order placement
    this.orderService.placeOrder(this.orderDetails).subscribe(
      (response: any) => {
        // Handle successful order placement
        console.log('Order placed successfully:', response);
        // You can reset the form or perform other actions upon successful order placement
      },
      (error: any) => {
        // Handle error in placing the order
        console.error('Error placing order:', error);
      }
    );
  }
}
