import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CreateOrderDTO } from 'src/app/models/order/new-order';
import { PriceDTO } from 'src/app/models/product';
import { ShoppingCartDTO } from 'src/app/models/shopping-cart/shopping-cart';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { AddToCartModalComponent } from '../add-to-cart-modal/add-to-cart-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private cartService: ShoppingCartService, private orderService: OrderService,
    private toastrService: ToastrService, private router: Router,   private dialog: MatDialog,) { }

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
    this.orderService.placeOrder(this.orderDetails).subscribe(
      (response: any) => {
        this.toastrService.showSuccessMessage("Заказ успешно оформлен!");
        this.router.navigateByUrl("/my-orders");
      },
      (error: any) => {
        this.toastrService.showErrorMessage("Ошибка при оформлении заказа");

      }
    );
  }


 openToCartModal(id: number, quantity: number, mnp?: string, pricesDto?: PriceDTO[], moq?: number,  ) {
   const dialogRef = this.dialog.open(AddToCartModalComponent, {
     width: '600px',
     height: '600px',
     data: {
       id: id,
       prices: pricesDto,
       mpn: mnp,
       moq: moq,
       quantity: quantity,
       isNewItem: false
     }
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed', result);
   });
   }
}
