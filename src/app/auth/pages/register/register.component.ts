import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public usuarioControl = new FormControl('',[Validators.required]);
  public emailControl = new FormControl('',[Validators.required, Validators.email]);
  public passwordControl = new FormControl('',[Validators.required]);

  public registerForm = new FormGroup({
    usuario: this.usuarioControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private authService: AuthService) {}

  register(){
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.authService.register(this.registerForm.getRawValue())
    }
  }

}
