import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { InscripcionesAddEditComponent } from 'src/app/dashboard/pages/inscripciones/inscripciones-add-edit/inscripciones-add-edit.component';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { InscripcionesInfoComponent } from './inscripciones-info/inscripciones-info.component';
import { InscripciónConInfoConId } from '../models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css'],
})
export class InscripcionesComponent {
  public inscripciones$: Observable<Array<InscripciónConInfoConId> | null>
  displayedColumns: string[];
  titulo: string = 'Inscripciones ABM';

  constructor(
    private _inscripcionesService: InscripcionesService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.inscripciones$ = this._inscripcionesService.alumnosPorInscripcion$
    this.displayedColumns = this._inscripcionesService.displayedColumns;
    this._inscripcionesService.getAlumnosPorInscripcion();
  }

  showButton(evento: InscripciónConInfoConId){
    this.matDialog.open(InscripcionesInfoComponent, {data: evento})
  }

  getInscripcion() {
    this._inscripcionesService.getAlumnosPorInscripcion();
  }

  deleteClase(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this._inscripcionesService.deleteInscripcion(id).subscribe({
              next: () => {
                this.snackbar.open('Clase Eliminada', 'Cerrar', {
                  duration: 5000,
                });
                this.getInscripcion();
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

  createClase(): void {
    this.matDialog
      .open(InscripcionesAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.getInscripcion()
            this.snackbar.open('Clase Agregada', 'Cerrar', { duration: 5000 });
          }
        },
      });
  }

  editClase(inscripcion: InscripciónConInfoConId ): void {

    const información = {
      id: inscripcion.id,
      alumno: inscripcion.alumno.id,
      curso: inscripcion.curso.id
    }

    this.matDialog
      .open(InscripcionesAddEditComponent, { data: información })
      .afterClosed()
      .subscribe({
        next: (claseUpdated) => {
          if (claseUpdated) {
            this._inscripcionesService.updateInscripcion(información.id, claseUpdated);
            this.snackbar.open('Clase Modificada', 'Cerrar', {
              duration: 5000,
            });
            this.getInscripcion();
          }
        },
      });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

    this.inscripciones$ = this._inscripcionesService.alumnosPorInscripcion$.pipe(
      map((valor) => {
        if (valor){
          return valor.filter((inscripcion: InscripciónConInfoConId) => {
            return (inscripcion.alumno.firstName.toLowerCase().startsWith(filterValue.toLowerCase()) || inscripcion.alumno.lastName.toLowerCase().startsWith(filterValue.toLowerCase()) || inscripcion.curso.areaCurso.toLowerCase().startsWith(filterValue.toLowerCase()))
          });
        }else{
          return null;
        }
      })
    );

  }
}
