import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCustomerDTO } from 'src/app/models/customer.models';
import { CustomerService } from 'src/app/services/customer.service';
import { MyValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form!: FormGroup;

  dto: CreateCustomerDTO = {
    "idCliente": 0,
    "nombre": "",
    "apellido": "",
    "direccion": "",
    "correo": "",
    "contrasenia": "",
    "dni": 0,
  };

  constructor (
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(5)]],
      confirmarContrasenia: ['', Validators.required],
      dni: ['', Validators.required]
    }, {
      validators: MyValidator.matchPasswords
    });
  }

  save(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      this.dto = this.form.value;
      this.customerService.createCustomer(this.dto)
      .subscribe(data => {
        this.router.navigate(['/inicio-sesion']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nombreField() {
    return this.form.get('nombre');
  }

  get apellidoField() {
    return this.form.get('apellido');
  }

  get direccionField() {
    return this.form.get('direccion');
  }

  get correoField() {
    return this.form.get('correo');
  }

  get contraseniaField() {
    return this.form.get('contrasenia');
  }

  get confirmarContraseniaField() {
    return this.form.get('confirmarContrasenia');
  }

  get dniField() {
    return this.form.get('dni');
  }
}
