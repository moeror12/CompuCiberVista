import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { CreateContactDTO } from '../../../models/contact.models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  form!: FormGroup;

  contactDto: CreateContactDTO = {
    "nombreapellido": '',
    "correo": '',
    "asunto": '',
    "mensaje": ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombreapellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.contactDto = this.form.value;
      this.contactService.registerContact(this.contactDto)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.form.markAllAsTouched();
    }

  }

}
