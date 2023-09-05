import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(private authService: AuthService) {}

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
