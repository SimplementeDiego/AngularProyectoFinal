import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public usuarioControl = new FormControl('',[Validators.required]);
  public emailControl = new FormControl('',[Validators.required, Validators.email]);
  public passwordControl = new FormControl('',[Validators.required]);
  public rolControl = new FormControl('Usuario');
  public tokenControl = new FormControl('');

  public registerForm = new FormGroup({
    usuario: this.usuarioControl,
    email: this.emailControl,
    password: this.passwordControl,
    rol: this.rolControl,
    token: this.tokenControl
  });

  rand(): string {
    return Math.random().toString(36).substr(2); // remove `0.`
  };

  token() {
    return this.rand() + this.rand() + this.rand() + '-' + this.rand() + this.rand() + this.rand(); // to make it longer
  };

  constructor(private authService: AuthService, private dialog: MatDialog) {

  }

  aviso(){
    this.dialog.open(AvisoComponent)
  }

  register(){

    const información = {
      email: this.registerForm.value.email || "",
      password: this.registerForm.value.password || "",
      usuario: this.registerForm.value.usuario || "",
      rol: this.registerForm.value.rol || "",
      token: this.token()
    }

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      let info = this.registerForm.getRawValue();
      info.token = this.token();
      this.authService.register(información)
    }
  }

}
