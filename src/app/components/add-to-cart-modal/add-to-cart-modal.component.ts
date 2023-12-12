import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddToCartModel } from 'src/app/models/shopping-cart/add-to-cart';
import { NewItemCartDTO } from 'src/app/models/shopping-cart/new-item-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.scss']
})
export class AddToCartModalComponent implements OnInit {

  newItem: NewItemCartDTO = {
    mpn: '',
    offerId: 0,
    quantity: 0,
    price: 0,
    totalAmount: 0
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddToCartModel,
    private shoppingCartService: ShoppingCartService,
    private dialogRef: MatDialogRef<AddToCartModalComponent>) {
    this.newItem.offerId = data.offerId;
    this.newItem.mpn = data.mnp
  }

  ngOnInit(): void {
  }

  foundPricing(selectedQuantity: number): number {
    let lowerPriceIndex = 0;
    let higherPriceIndex = this.data.prices.length - 1;

    for (let i = 0; i < this.data.prices.length; i++) {
      if (this.data.prices[i].quantity <= selectedQuantity) {
        lowerPriceIndex = i;
      } else {
        higherPriceIndex = i;
        break;
      }
    }
    const lowerPrice = this.data.prices[lowerPriceIndex];

    return lowerPrice.priceValue;
  }

  onQuantityChange() {
    this.newItem.price = this.foundPricing(this.newItem.quantity);
    this.newItem.totalAmount = this.newItem.price* this.newItem.quantity;
  }

  addToCart() {
    this.shoppingCartService.addItemToCart(this.newItem)
      .subscribe(res => {
        console.log('Товар добавлен в корзину')
        this.dialogRef.close();
      }
      );
  }
}
