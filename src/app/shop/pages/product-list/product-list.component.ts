import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.models';
import { Product } from 'src/app/models/product.models';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productsFiltered: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productsService.getProducts()
    .subscribe(data => {
      console.log(data);
      this.products = data;
      this.productsFiltered = this.products;
    });
  }

  getCategories() {
    this.categoryService.getCategories()
    .subscribe(data => {
      this.categories = data;
    });
  }

  selectCategory(id: number) {
    this.productsFiltered = this.products.filter(({ categoriaId }) => categoriaId === id);
  }
}
