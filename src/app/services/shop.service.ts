import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // private myListBase: Product[] = [];
  private myList: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  private login = new BehaviorSubject<string>('');
  login$ = this.login.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.myList.push(product);
    // this.myList = this.myListBase;
    this.myCart.next(this.myList);
  }

  deleteProduct(producto: Product) {
    let index = this.myList.indexOf(producto);
    this.myList.splice(index, 1);
    this.myCart.next(this.myList);
  }

  resetCart() {
    this.myList = [];
    this.myCart.next(this.myList);
  }

  setEmailLogin(emailLogin: string) {
    this.login.next(emailLogin);
  }
  
}
