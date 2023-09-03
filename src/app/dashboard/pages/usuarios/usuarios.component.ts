import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { map } from 'rxjs';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  estudiantes: Observable<Array<any>>;
  displayedColumns: string[];
  titulo: string = 'Usuarios ABM';

  constructor(
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar,
    private usuariosService: UsuariosService,
  ) {
    this.estudiantes = this.usuariosService.getUsuarioList();
    this.displayedColumns = this.usuariosService.displayedColumns;
  }

  getUsuariosList() {
    this.estudiantes = this.usuariosService.getUsuarioList();
  }

  showButton(usuario: any){

    this.matDialog.open(UserInfoComponent, { data: usuario }).afterClosed()

  }

  deleteUsuario(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.usuariosService.deleteUsuario(id).subscribe({
              next: (res) => {
                this.snackbar.open("Usuario Eliminado", "Cerrar",{duration:5000});
                this.getUsuariosList();
              },
              error: (err) => {
                this.matDialog.open(PopupComponent, {
                  data: 'Ocurrio un error. Intentalo mas tarde.',
                });
              },
            });
          }
        },
      });
  }

  addUsuario(): void {
    this.matDialog
      .open(UserAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.snackbar.open("Usuario Agregado", "Cerrar",{duration:5000});
            this.getUsuariosList();
          } else {
          }
        },
      });
  }

  updateUsuario(student: any): void {
    this.matDialog
      .open(UserAddEditComponent, { data: student })
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

    this.estudiantes = this.usuariosService.getUsuarioList().pipe(
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
