import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}/Producto/getProducts`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/Producto/obtenerProducto/${id}`);
  }
}
