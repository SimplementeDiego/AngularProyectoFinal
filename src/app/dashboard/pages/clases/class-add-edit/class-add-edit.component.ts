import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { ClasesService } from 'src/app/core/services/clases.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { baseUrl } from 'src/environments/environments';

@Component({
  selector: 'app-class-add-edit',
  templateUrl: './class-add-edit.component.html',
  styleUrls: ['./class-add-edit.component.css']
})
export class ClassAddEditComponent implements OnInit {
  alumnoControl = new FormControl<any>(null, [Validators.required]);
  cursoControl = new FormControl<any>(null, [Validators.required]);

  inscripcionForm = new FormGroup({
    alumno: this.alumnoControl,
    curso: this.cursoControl
  });

  alumnosOptions$: Observable<any[]>;
  cursosOptions$: Observable<any[]>;

  selected:any;




  constructor(
    private _dialogRef: MatDialogRef<ClassAddEditComponent>,
    private _clasesService: ClasesService,
    private _alumnosService: AlumnosService,
    private _cursosService: CursosService,
    private _http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
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
        this._clasesService
          .updateClase(this.data.id, this.inscripcionForm.value)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._clasesService.addClase(this.inscripcionForm.value).subscribe({
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
