import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PriceDTO, ProductDTO } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AddToCartModalComponent } from '../add-to-cart-modal/add-to-cart-modal.component';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: ProductDTO[] = [];
  itemName?: string;

  constructor(private productService: ProductService,
     private dialog: MatDialog,
     private loaderService: LoaderService,
     private toasrtService: ToastrService) { }


  openAddToCartModal(mnp?: string, offerId?: number, pricesDto?: PriceDTO[], clickUrl?: string, moq?: number ) {
    const dialogRef = this.dialog.open(AddToCartModalComponent, {
      width: '600px',
      height: '600px',
      data: {
        prices: pricesDto,
        mpn: mnp,
        offerId: offerId,
        clickUrl: clickUrl,
        moq: moq,
        isNewItem: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
    }

  loadProducts() {
    this.loaderService.show();
    this.toasrtService.showErrorMessage("Получаем данные");
    this.productService.getProducts(this.itemName).subscribe(
      (data: ProductDTO[]) => {
        this.loaderService.show();
        this.products = data;
       this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
        this.toasrtService.showErrorMessage("Ошибка при загрузке продукта");
      }
    );
  }
}
