import { AbstractControl } from '@angular/forms';

export class MyValidator {

  static matchPasswords(control: AbstractControl) {
    const contrasenia = control.get('contrasenia')?.value;
    const confirmarContrasenia = control.get('confirmarContrasenia')?.value;
    
    if (contrasenia === confirmarContrasenia) {
      return null;
    }

    return { contra_igual: true };

  }
}