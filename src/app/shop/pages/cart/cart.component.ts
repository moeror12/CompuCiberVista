import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Product, ProductTable } from 'src/app/models/product.models';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  dataSource = new MatTableDataSource<Product>();
  products: Product[] = [];

  login$ = this.shopService.login$;

  displayedColumns: string[] = [
    'producto',
    'nombre',
    'precio',
    'accion'
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.myCart$.subscribe((items: Product[]) => {
      this.products = items;
      this.dataSource.data = this.products;
    });
  }

  getTotal() {
    const total = this.products.reduce((acumulador: number, item: Product) => {
      acumulador = acumulador + parseFloat(item.precio.toFixed(2));
      return parseFloat(acumulador.toFixed(2));
    }, 0);
    return total;
  }

  deleteItemById(productoId: Product) {
    this.shopService.deleteProduct(productoId);
  }
}
