import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { InscripcionesAddEditComponent } from 'src/app/dashboard/pages/inscripciones/inscripciones-add-edit/inscripciones-add-edit.component';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { InscripcionesInfoComponent } from './inscripciones-info/inscripciones-info.component';
import { InscripciónConId, InscripciónConInfoConId } from '../models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css'],
})
export class InscripcionesComponent implements OnInit, OnDestroy{
  public inscripciones$: Observable<Array<InscripciónConInfoConId>>
  displayedColumns: string[];
  titulo: string = 'Inscripciones ABM';

  constructor(
    private _inscripcionesService: InscripcionesService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.inscripciones$ = this._inscripcionesService.inscripcionesConInfoEmitidas$
    this.displayedColumns = this._inscripcionesService.displayedColumns;
  }

  ngOnInit(): void {
    this._inscripcionesService.getInscripcionList();
  }

  getInscripcionesList(){
    this._inscripcionesService.getInscripcionList();
  }

  ngOnDestroy(): void {
    this._inscripcionesService.clear();
  }

  showButton(evento: InscripciónConInfoConId){
    this.matDialog.open(InscripcionesInfoComponent, {data: evento})
  }

  deleteClase(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this._inscripcionesService.deleteInscripcion(id)
          }
        },
      });
  }

  createClase(): void {
    this.matDialog.open(InscripcionesAddEditComponent)
  }

  editClase(inscripcion: InscripciónConInfoConId ): void {

    const información = {
      id: inscripcion.id,
      alumno: inscripcion.alumno.id,
      curso: inscripcion.curso.id
    }

    this.matDialog.open(InscripcionesAddEditComponent, { data: información })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inscripciones$ = this._inscripcionesService.inscripcionesConInfoEmitidas$.pipe(
      map((valor) => {
        return valor.filter((inscripcion: InscripciónConInfoConId) => {
          return inscripcion.alumno.firstName
            .toLowerCase()
            .startsWith(filterValue.toLowerCase());
        });
      })
    );
  }

}
