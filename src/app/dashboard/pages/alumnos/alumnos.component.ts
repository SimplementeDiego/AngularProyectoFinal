import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { StudAddEditComponent } from 'src/app/dashboard/pages/alumnos/stud-add-edit/stud-add-edit.component';
import { Observable, map } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { PopupVerifyComponent } from '../../../shared/components/popup-verify/popup-verify.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { ClasesService } from 'src/app/core/services/clases.service';
import { AlumnosInfoComponent } from './alumnos-info/alumnos-info.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent {
  estudiantes: Observable<Array<any>>;
  displayedColumns: string[];
  titulo: string = 'Alumnos ABM';

  constructor(
    private alumnosService: AlumnosService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar,
    private _inscripcionesService: ClasesService
  ) {
    this.estudiantes = this.alumnosService.getAlumnoList();
    this.displayedColumns = this.alumnosService.displayedColumns;
  }

  getAlumnosList() {
    this.estudiantes = this.alumnosService.getAlumnoList();
  }

  deleteAlumno(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this._inscripcionesService.deleteInscripcionesAlumno(id)
            this.alumnosService.deleteAlumno(id).subscribe({
              next: (res) => {
                this.snackbar.open("Alumno Eliminado", "Cerrar",{duration:5000});
                this.getAlumnosList();
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

  addAlumno(): void {
    this.matDialog
      .open(StudAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.snackbar.open("Alumno Agregado", "Cerrar",{duration:5000});
            this.getAlumnosList();
          } else {
          }
        },
      });
  }

  showButton(evento: any){

    this.matDialog.open(AlumnosInfoComponent, { data:evento });

  }

  updateAlumno(student: any): void {
    this.matDialog
      .open(StudAddEditComponent, { data: student })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.snackbar.open("Alumno Modificado", "Cerrar",{duration:5000});
            this.getAlumnosList();
          }
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.estudiantes = this.alumnosService.getAlumnoList().pipe(
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
