import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CursosComponent } from './cursos.component';
import { CursosAddEditComponent } from '../cursos/cursos-add-edit/cursos-add-edit.component';



@NgModule({
  declarations: [
    CursosComponent,
    CursosAddEditComponent
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
    CursosComponent,
    CursosAddEditComponent
  ]
})
export class CursosModule { }
