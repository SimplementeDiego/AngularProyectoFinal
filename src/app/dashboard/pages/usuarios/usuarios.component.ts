import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { map } from 'rxjs';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsuarioConId } from '../models';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  usuarios: Observable<Array<UsuarioConId>>;
  displayedColumns: string[];
  titulo: string = 'Usuarios ABM';

  constructor(
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar,
    private _usuariosService: UsuariosService,
  ) {
    this.displayedColumns = this._usuariosService.displayedColumns;
    this.usuarios = this._usuariosService.usuariosEmitidos$
  }

  ngOnDestroy(): void {
    this._usuariosService.clear();
  }

  ngOnInit(): void {
    this._usuariosService.getUsuarioList();
  }

  getUsuariosList() {
    this._usuariosService.getUsuarioList();
  }

  showButton(usuario: UsuarioConId){

    this.matDialog.open(UserInfoComponent, { data: usuario }).afterClosed()

  }

  deleteUsuario(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this._usuariosService.deleteUsuario(id)
          }
        },
      });
  }

  addUsuario(): void {
    this.matDialog.open(UserAddEditComponent)

  }

  updateUsuario(usuario: UsuarioConId): void {
    this.matDialog
      .open(UserAddEditComponent, { data: usuario })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.snackbar.open("Usuario Modificado", "Cerrar",{duration:5000});
            this.getUsuariosList();
          }
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.usuarios = this.usuarios.pipe(
      map((valor) => {
        return valor.filter((estudiante: any) => {
          return estudiante.firstName
            .toLowerCase()
            .startsWith(filterValue.toLowerCase());
        });
      })
    );
  }
}
