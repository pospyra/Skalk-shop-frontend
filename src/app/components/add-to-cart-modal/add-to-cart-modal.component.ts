import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddToCartModel } from 'src/app/models/shopping-cart/add-to-cart';
import { NewItemCartDTO } from 'src/app/models/shopping-cart/new-item-cart';
import { UpdateItemCartDTO } from 'src/app/models/shopping-cart/update-item-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.scss']
})
export class AddToCartModalComponent implements OnInit {

  minCount = 0;
  isNewItem = false;
  priceValue = 0;
  totalAmount = 0;
  quantity = 0;

  newItem: NewItemCartDTO = {
    mpn: '',
    offerId: 0,
    quantity: 0,
    price: 0,
    totalAmount: 0,
    clickUrl: ''
  }

  updateItem: UpdateItemCartDTO = {
    id: 0,
    quantity: 0,
    price: 0
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddToCartModel,
    private shoppingCartService: ShoppingCartService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<AddToCartModalComponent>) {

    this.minCount = data.moq;
    this.isNewItem = data.isNewItem;

    if (this.isNewItem) {

      this.newItem.offerId = data.offerId;
      this.newItem.mpn = data.mpn;
      this.newItem.clickUrl = data.clickUrl;
      this.quantity = this.minCount
    }
    else {
      this.updateItem.id = data.id,
        this.quantity = data.quantity
        this.onQuantityChange()
    }
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
    this.priceValue = this.foundPricing(this.quantity);
    this.totalAmount = this.priceValue * this.quantity;
  }

  updateItemInCart() {
    this.updateItem.price = this.priceValue
    this.updateItem.quantity = this.quantity

    this.shoppingCartService.updatetemInCart(this.updateItem)
      .subscribe(res => {
        this.toastrService.showSuccessMessage("Изменения внесены. Обновите страницу.");
        this.dialogRef.close();
      });
  }

  addToCart() {
    this.newItem.price = this.priceValue
    this.newItem.quantity = this.quantity

    this.shoppingCartService.addItemToCart(this.newItem)
      .subscribe(res => {
        this.toastrService.showSuccessMessage("Продукт добавлен в корзину");
        this.dialogRef.close();
      }
      );
  }
}
