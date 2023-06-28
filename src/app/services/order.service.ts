import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Orden, OrdenDetalle } from '../models/orden.models';
import { Venta } from '../models/venta.models';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = environment.baseUrl;

  orders: Orden[] = [];
  lastOrden: Orden = {
    'idOrden': 0,
    'correo': ''
  }
  ordenDetalleDto: OrdenDetalle[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getOrders() {
    return this.http.get<Orden[]>(`${this.url}/Orden/getOrdenes`);
  }

  createOrder(dto: Orden) {
    return this.http.post(`${this.url}/Orden/createOrden`, dto);
  }

  createOrderDetalle(dto: OrdenDetalle[]) {
    return this.http.post(`${this.url}/DetalleOrden/createDetalleOrden`, dto);
  }

  registrarVenta(dto: Venta) {
    return this.http.post(`${this.url}/Venta/createVenta`, dto);
  }

  registrarOrden(orden: Orden, ordenDetalle: OrdenDetalle[], venta: Venta) {
    return this.createOrder(orden)
    .pipe(
      switchMap((response: any) => {
        console.log('hola 3', response);
        return this.getOrders();
      }),
      switchMap((response: any) => {
        this.lastOrden = response.reverse()[0];
        this.ordenDetalleDto = ordenDetalle.map(detalle => {
          return {
            ...detalle,
            idOrden: detalle.idOrden
          }
        });
        console.log('hola 4', response);
        return this.createOrderDetalle(this.ordenDetalleDto);
      }),
      switchMap((response: any) => {
        venta.idOrden = this.lastOrden.idOrden;
        console.log('hola 5', response);
        console.log(venta);
        return this.registrarVenta(venta);
      })
    )
  }
}
