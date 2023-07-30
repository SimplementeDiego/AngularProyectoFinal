import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudAddEditComponent } from './stud-add-edit/stud-add-edit.component';
import { AlumnosComponent } from './alumnos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    StudAddEditComponent,
    AlumnosComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    StudAddEditComponent,
    AlumnosComponent,
  ]
})
export class AlumnosModule { }
