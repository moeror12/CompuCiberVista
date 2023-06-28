import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateContactDTO } from '../models/contact.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  registerContact(contact: CreateContactDTO) {
    return this.http.post(`${this.url}/Contacto/createContacto`, contact);
  }
}
