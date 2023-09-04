import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { AlumnoConId } from '../../models';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-stud-add-edit',
  templateUrl: './alumnos-add-edit.component.html',
  styleUrls: ['./alumnos-add-edit.component.css'],
})
export class AlumnosAddEditComponent implements OnInit {
  firstNameControl = new FormControl<string>('', [Validators.required]);
  lastNameControl = new FormControl<string>('', [Validators.required]);
  emailControl = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);

  alumnosForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
  });

  constructor(
    private _dialogRef: MatDialogRef<AlumnosAddEditComponent>,
    private _alumnosService: AlumnosService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: AlumnoConId
  ) {}

  ngOnInit(): void {
    this.alumnosForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.alumnosForm.valid) {

      const información = {
        firstName: this.alumnosForm.value.firstName || '',
        lastName: this.alumnosForm.value.lastName || '',
        email: this.alumnosForm.value.email || '',
      };

      if (this.data) {
        this._alumnosService.updateAlumno(this.data.id, información).subscribe({
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
        this._alumnosService.addAlumno(información).subscribe({
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
