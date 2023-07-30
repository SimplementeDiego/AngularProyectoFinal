import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.cursoForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.cursoForm.valid) {
      this._dialogRef.close(this.cursoForm.value);
    }else{
      this._dialogRef.close();
    }
  }
}
