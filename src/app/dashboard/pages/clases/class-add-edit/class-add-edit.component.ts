import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClasesService } from 'src/app/core/services/clases.service';

@Component({
  selector: 'app-class-add-edit',
  templateUrl: './class-add-edit.component.html',
  styleUrls: ['./class-add-edit.component.css']
})
export class ClassAddEditComponent implements OnInit {
  nombreClaseControl = new FormControl<string | null>(null, [Validators.required]);
  cantidadAlumnosControl = new FormControl<number | null>(null, [Validators.required]);
  profesorControl = new FormControl<string | null>(null, [Validators.required]);

  claseForm = new FormGroup({
    nombreClase: this.nombreClaseControl,
    cantidadAlumnos: this.cantidadAlumnosControl,
    profesor: this.profesorControl,
  });

  constructor(
    private _dialogRef: MatDialogRef<ClassAddEditComponent>,
    private _clasesService: ClasesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.claseForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.claseForm.valid) {
      if (this.data) {
        this._clasesService
          .updateClase(this.data.id, this.claseForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Clase modificada.');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._clasesService.addClase(this.claseForm.value).subscribe({
          next: (val: any) => {
            alert('Clase agregada correctamente.');
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
