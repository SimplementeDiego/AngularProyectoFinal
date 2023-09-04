import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { AlumnosAddEditComponent } from '../../alumnos/alumnos-add-edit/alumnos-add-edit.component';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent {

  usuarioControl = new FormControl<string | null>(null, [ Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl<string | null>(null, [ Validators.required]);
  rolControl = new FormControl('Usuario');
  tokenControl = new FormControl('');

  tiposRol = ["Usuario", "Administrador"];

  userForm = new FormGroup({
    usuario: this.usuarioControl,
    email: this.emailControl,
    password: this.passwordControl,
    rol: this.rolControl,
    token: this.tokenControl
  });

  constructor(
    private _dialogRef: MatDialogRef<AlumnosAddEditComponent>,
    private _usuariosService: UsuariosService ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this._usuariosService
          .updateUsuario(this.data.id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._usuariosService.addUsuario(this.userForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
