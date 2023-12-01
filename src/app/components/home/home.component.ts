import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
[x: string]: any;
  products: ProductDTO[] = [];
  itemName?: string;
  constructor(private productService: ProductService) { }


  ngOnInit(): void {
  }

  getProductPrice(product: ProductDTO, quantity: number): string {
    const offer = product.offers.find(offer =>
      offer.prices !== null && offer.prices !== undefined && offer.prices.length > 0
    );

    if (offer !== undefined && offer.prices !== null && offer.prices !== undefined) {
      console.log('Offer:', offer); // Check the offer details

      const price = offer.prices.find(price =>
        price.quantity === quantity && price.currency === 'USD'
      );

      console.log('Price:', price); // Check the price details

      if (price) {
        return `${price.priceValue} ${price.currency || 'USD'}`;
      }
    }
    return 'N/A';
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
