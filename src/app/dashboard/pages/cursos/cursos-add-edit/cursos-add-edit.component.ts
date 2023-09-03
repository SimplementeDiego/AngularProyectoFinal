import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from 'src/app/core/services/cursos.service';

@Component({
  selector: 'app-cursos-add-edit',
  templateUrl: './cursos-add-edit.component.html',
  styleUrls: ['./cursos-add-edit.component.css']
})
export class CursosAddEditComponent implements OnInit {
  areaCursoControl = new FormControl<string | null>(null, [Validators.required]);
  duracionControl = new FormControl<string | null>(null, [Validators.required]);
  certificadoControl = new FormControl<string | null>(null, [Validators.required]);

  cursoForm = new FormGroup({
    areaCurso: this.areaCursoControl,
    duracion: this.duracionControl,
    certificado: this.certificadoControl,
  });

  constructor(
    private _dialogRef: MatDialogRef<CursosAddEditComponent>,
    private cursosService: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.cursoForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.cursoForm.valid) {
      if (this.data) {
        this.cursosService
          .updateCurso(this.data.id, this.cursoForm.value)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.cursosService.addCurso(this.cursoForm.value).subscribe({
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
