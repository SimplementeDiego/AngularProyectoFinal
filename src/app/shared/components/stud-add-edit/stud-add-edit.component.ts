import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stud-add-edit',
  templateUrl: './stud-add-edit.component.html',
  styleUrls: ['./stud-add-edit.component.css'],
})
export class StudAddEditComponent implements OnInit {

  firstNameControl = new FormControl<string | null>(null, [ Validators.required]);
  lastNameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  studForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
  });

  constructor(
    private _dialogRef: MatDialogRef<StudAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.studForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.studForm.valid) {
      this._dialogRef.close(this.studForm.value);
    }else{
      this._dialogRef.close();
    }
  }

}
