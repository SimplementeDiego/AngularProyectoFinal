import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { AlumnosAddEditComponent } from '../../alumnos/alumnos-add-edit/alumnos-add-edit.component';
import { UsuarioConId } from '../../models';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent {

  usuarioControl = new FormControl<string>("", [ Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl<string>("", [ Validators.required]);
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
    @Inject(MAT_DIALOG_DATA) public data: UsuarioConId
  ) {
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userForm.valid) {

      if (this.data) {

        const información = {
          id: this.data.id,
          usuario: this.userForm.value.usuario || "",
          email: this.userForm.value.email || "",
          password: this.userForm.value.password || "",
          rol: this.userForm.value.rol || "",
          token: this.userForm.value.token || ""
        }
        this._usuariosService.updateUsuario(this.data.id, información)
        this._dialogRef.close(true);
      } else {

        const información = {
          usuario: this.userForm.value.usuario || "",
          email: this.userForm.value.email || "",
          password: this.userForm.value.password || "",
          rol: this.userForm.value.rol || "",
          token: this.userForm.value.token || ""
        }

        this._usuariosService.addUsuario(información);
        this._dialogRef.close(true);
      }
    }
  }

}
