import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  lastProducts: Product[] = [];
  mostSellerProducts: Product[] = [];

  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((data: Product[]) => {
      this.products = data;
      this.mostSellerProducts = this.products.slice(0, 3);
      this.lastProducts = this.products.reverse().slice(0, 3);
    });
  }
}
