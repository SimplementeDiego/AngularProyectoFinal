import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AlumnoConId, CursoConId, InscripciónConId } from '../../models';

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
    private _inscripcionesService: InscripcionesService,
    private _alumnosService: AlumnosService,
    private _cursosService: CursosService,
    private _dialogRef: MatDialogRef<InscripcionesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InscripciónConId
  ) {
    this.alumnosOptions$ = this._alumnosService.alumnosEmitidos$;
    this.cursosOptions$ = this._cursosService.cursosEmitidos$;
  }

  ngOnInit(): void {
    this._cursosService.getCursoList();
    this._alumnosService.getAlumnoList();
    this.inscripcionForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.inscripcionForm.valid) {

      const información = {
        alumno: this.inscripcionForm.value.alumno || '',
        curso: this.inscripcionForm.value.curso || ''
      }

      if (this.data) {
        console.log(información)
        this._dialogRef.close(true);
        this._inscripcionesService.updateInscripcion(this.data.id, información)

      } else {
        console.log(información)
        this._dialogRef.close(true);
        this._inscripcionesService.addInscripcion(información)
      }
    }
  }
}
