import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AlumnoConId, CursoConId, InscripciónConId } from '../../models';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-inscripciones-add-edit',
  templateUrl: './inscripciones-add-edit.component.html',
  styleUrls: ['./inscripciones-add-edit.component.css']
})
export class InscripcionesAddEditComponent implements OnInit {
  alumnoControl = new FormControl<string>('', [Validators.required]);
  cursoControl = new FormControl<string>('', [Validators.required]);

  inscripcionForm = new FormGroup({
    alumno: this.alumnoControl,
    curso: this.cursoControl
  });

  alumnosOptions$: Observable<Array<AlumnoConId>>;
  cursosOptions$: Observable<Array<CursoConId>>;

  constructor(
    private _dialogRef: MatDialogRef<InscripcionesAddEditComponent>,
    private _inscripcionesService: InscripcionesService,
    private _alumnosService: AlumnosService,
    private _cursosService: CursosService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: InscripciónConId
  ) {
    this.alumnosOptions$ = this._alumnosService.getAlumnoList();
    this.cursosOptions$ = this._cursosService.getCursoList();
  }

  ngOnInit(): void {
    this.inscripcionForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.inscripcionForm.valid) {
      if (this.data) {

        const información = {
          alumno: this.inscripcionForm.value.alumno || '',
          curso: this.inscripcionForm.value.curso || ''
        }

        this._inscripcionesService
          .updateInscripcion(this.data.id, información)
          .subscribe({
            next: () => {
              this._dialogRef.close(true);
            },
            error: () => {
              this.matDialog.open(PopupComponent, {
                data: 'Ocurrio un error. Intentalo mas tarde.',
              });
            },
          });
      } else {

        const información = {

          alumno: this.inscripcionForm.value.alumno || '',
          curso: this.inscripcionForm.value.curso || ''

        }

        this._inscripcionesService.addInscripcion(información).subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
          error: () => {
            this.matDialog.open(PopupComponent, {
              data: 'Ocurrio un error. Intentalo mas tarde.',
            });
          },
        });
      }
    }
  }
}
