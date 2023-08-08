import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassAddEditComponent } from './class-add-edit/class-add-edit.component';
import { ClasesComponent } from './clases.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClasesRoutingModule } from './clases-routing.module';

@NgModule({
  declarations: [
    ClassAddEditComponent,
    ClasesComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    ClasesRoutingModule
  ],
  exports: [
    ClassAddEditComponent,
    ClasesComponent,
  ]
})
export class ClasesModule { }
