import { Component, EventEmitter, Output } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  myCart$ = this.shop.myCart$;

  login$ = this.shop.login$;

  constructor(
    private shop: ShopService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('correo');
    this.shop.setEmailLogin('');
    window.location.reload();
  }

}
