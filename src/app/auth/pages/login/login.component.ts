import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordControl = new FormControl('', [Validators.required]);

  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private authService: AuthService, private dialog: MatDialog) {

    this.dialog.open(AvisoComponent)

  }

  aviso(){
    this.dialog.open(AvisoComponent)
  }

  login(){

    const información = {
      email: this.loginForm.value.email || "",
      password: this.loginForm.value.password || ""
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(información)
    }

  }
}
