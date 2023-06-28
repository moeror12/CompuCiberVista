import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private productsService: ProductsService,
    private shop: ShopService
  ) { }

  ngOnInit(): void {
    
  }

  addProductToCart(product: Product) {
    this.shop.addProduct(product);
  }
  
}
