import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateCustomerDTO } from '../models/customer.models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  createCustomer(dto: CreateCustomerDTO) {
    return this.http.post(`${this.url}/Cliente/createCliente`, dto);
  }
}
