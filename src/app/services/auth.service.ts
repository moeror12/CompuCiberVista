import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(login: any) {
    let body = {
      correo: login.correo,
      contrasenia: login.contrasenia
    }
    return this.http.post(`http://www.tienditacompucib.somee.com/api/Cliente/Login`, body);
  }
}
