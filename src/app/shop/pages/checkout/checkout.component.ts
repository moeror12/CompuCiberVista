import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'
import { Orden, OrdenDetalle } from 'src/app/models/orden.models';
import { Product } from 'src/app/models/product.models';
import { Venta } from 'src/app/models/venta.models';
import { ShopService } from 'src/app/services/shop.service';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  metodoError = false;

  formFacturacion!: FormGroup;
  formPaymentMethod!: FormGroup;

  dataSource = new MatTableDataSource<Product>();
  products: Product[] = [];

  displayedColumns: string[] = [
    'nombre',
    'precio'
  ];

  orderDto: Orden = {
    "idOrden": 0,
    "correo": ''
  }

  orderDetalleDto: OrdenDetalle[] = [];

  ventaDto: Venta = {
    "name": '',
    "lastName": '',
    "address": '',
    "landmark": '',
    "district": '',
    "phoneNumber": '',
    "paymentMethod": '',
    "idOrden": 0,
    "diaVenta": new Date()
  }

  constructor(
    private formBuilder: FormBuilder,
    private shopService: ShopService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.buildFormFacturacion();
    this.buildFormPaymentMethod();
  }

  ngOnInit(): void {
    this.shopService.myCart$.subscribe((items: Product[]) => {
      this.products = items;
      this.dataSource.data = this.products;
    });
  }

  buildFormFacturacion() {
    this.formFacturacion = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      landmark: ['', Validators.required],
      district: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  buildFormPaymentMethod() {
    this.formPaymentMethod = this.formBuilder.group({
      paymentMethod: ['', Validators.required]
    });
  }

  getTotal() {
    const total = this.products.reduce((acumulador: number, item: Product) => {
      acumulador = acumulador + parseFloat(item.precio.toFixed(2));
      return parseFloat(acumulador.toFixed(2));
    }, 0);
    return total;
  }

  pay() {
    if (this.formFacturacion.valid && this.formPaymentMethod.valid) {
      console.log('Hola1');
      const correo = localStorage.getItem('correo')!;
      this.orderDto.correo = correo;
      this.orderDetalleDto = this.products.map(product => {
        return {
          idDetalleOrden: 0,
          nomProducto: product.nombre,
          precio: product.precio,
          idOrden: 0
        }
      });
      this.ventaDto = this.formFacturacion.value;
      this.ventaDto.paymentMethod = this.formPaymentMethod.get('paymentMethod')?.value;
      console.log('Hola2');
      this.orderService.registrarOrden(this.orderDto, this.orderDetalleDto, this.ventaDto)
      .subscribe((response: any) => {
        console.log('Ultimo hola',response);
        Swal.fire({
          icon: 'success',
          title: 'Compra exitosa'
        }).then(() => {
          this.shopService.resetCart();
          this.router.navigate(['/']);
        })
      });
    } else {
      this.metodoError = true;
      this.formFacturacion.markAllAsTouched();
      this.formPaymentMethod.markAllAsTouched();
    }
  }

}
