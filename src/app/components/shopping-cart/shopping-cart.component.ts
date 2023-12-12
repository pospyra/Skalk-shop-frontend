import { Component } from '@angular/core';
import { ItemCartDTO } from 'src/app/models/shopping-cart/itemCart';
import { ShoppingCartDTO } from 'src/app/models/shopping-cart/shopping-cart';
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

  constructor(private cartService: ShoppingCartService) { }

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
}
