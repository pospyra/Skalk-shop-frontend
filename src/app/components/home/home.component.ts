import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PriceDTO, ProductDTO } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AddToCartModalComponent } from '../add-to-cart-modal/add-to-cart-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: ProductDTO[] = [];
  itemName?: string;

  constructor(private productService: ProductService, private dialog: MatDialog) { }


  openAddToCartModal(mnp: string, offerId: number, pricesDto?: PriceDTO[] ) {
    const dialogRef = this.dialog.open(AddToCartModalComponent, {
      width: '600px',
      height: '600px',
      data: {
        prices: pricesDto,
        mnp: mnp,
        offerId: offerId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
    }

  loadProducts() {
    this.productService.getProducts(this.itemName).subscribe(

      (data: ProductDTO[]) => {
        this.products = data;
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
