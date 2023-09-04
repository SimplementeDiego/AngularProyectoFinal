import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from 'src/app/core/services/cursos.service';
import { CursoConId } from '../../models';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

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
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CursoConId
  ) {
  }

  ngOnInit(): void {
    this.cursoForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.cursoForm.valid) {

      const información = {
        areaCurso: this.cursoForm.value.areaCurso || '',
        duracion: this.cursoForm.value.duracion || '',
        certificado: this.cursoForm.value.certificado || '',
      };

      if (this.data) {
        this.cursosService
          .updateCurso(this.data.id, información)
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
        this.cursosService.addCurso(información).subscribe({
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
