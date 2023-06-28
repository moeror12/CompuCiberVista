import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.models';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id: number = 0;
  product: Product = {
    productoId: 0,
    nombre: '',
    precio: 0,
    fechaCreacion: new Date,
    foto: '',
    categoriaId: 0,
    categoria: '',
    stock: 0,
    descripcion: ''
  };

  cantidad = 0;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private shop: ShopService
  ) { }

  ngOnInit(): void {
    this.route
    .paramMap
    .pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          this.id = parseInt(id);
          return this.productsService.getProductById(this.id);
        }
        return [];
      })
    )
    .subscribe(data => {
      this.product = data;
      console.log(this.product);
    });
  }

  addProductToCart(product: Product) {
    const newProduct = {
      ...product,
      precio: this.cantidad * product.precio
    }
    this.shop.addProduct(newProduct);
  }
}
