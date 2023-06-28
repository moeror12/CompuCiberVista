import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../../../models/auth.models';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  dto: Login = {
    correo: '',
    contrasenia: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private shopService: ShopService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  login(event: Event) {
    event.preventDefault();
    console.log(this.form.value);
    if (this.form.valid) {
      this.form.value;
      this.authService.login(this.form.value)
      .subscribe((response: any) => {
        localStorage.setItem('correo', response.resultado);
        this.shopService.setEmailLogin(response.resultado);
        this.router.navigate(['/']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get correoField() {
    return this.form.get('correo');
  }

  get contraseniaField() {
    return this.form.get('contrasenia');
  }

}
