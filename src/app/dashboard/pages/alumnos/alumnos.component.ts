import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AlumnosAddEditComponent } from 'src/app/dashboard/pages/alumnos/alumnos-add-edit/alumnos-add-edit.component';
import { Observable, map } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { PopupVerifyComponent } from '../../../shared/components/popup-verify/popup-verify.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { AlumnosInfoComponent } from './alumnos-info/alumnos-info.component';
import { AlumnoConId } from '../models';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent {
  alumnos: Observable<Array<AlumnoConId>>;
  displayedColumns: string[];
  titulo: string = 'Alumnos ABM';

  constructor(
    private alumnosService: AlumnosService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar,
    private _inscripcionesService: InscripcionesService
  ) {
    this.alumnos = this.alumnosService.getAlumnoList();
    this.displayedColumns = this.alumnosService.displayedColumns;
  }

  getAlumnosList() {
    this.alumnos = this.alumnosService.getAlumnoList();
  }

  deleteAlumno( id: number ) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this._inscripcionesService.deleteInscripcionesAlumno(id)
            this.alumnosService.deleteAlumno(id).subscribe({
              next: () => {
                this.snackbar.open("Alumno Eliminado", "Cerrar",{duration:5000});
                this.getAlumnosList();
              },
              error: () => {
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
      .open(AlumnosAddEditComponent)
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

  showButton( alumno: AlumnoConId ){

    this.matDialog.open(AlumnosInfoComponent, { data:alumno });

  }

  updateAlumno( alumno: AlumnoConId ): void {
    this.matDialog
      .open(AlumnosAddEditComponent, { data: alumno })
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

    this.alumnos = this.alumnosService.getAlumnoList().pipe(
      map((valor) => {
        return valor.filter((alumno: AlumnoConId) => {
          return alumno.firstName
            .toLowerCase()
            .startsWith(filterValue.toLowerCase());
        });
      })
    );
  }

}
