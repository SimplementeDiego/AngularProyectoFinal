import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudAddEditComponent } from './stud-add-edit/stud-add-edit.component';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosInfoComponent } from './alumnos-info/alumnos-info.component';

@NgModule({
  declarations: [
    StudAddEditComponent,
    AlumnosComponent,
    AlumnosInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule,
  ],
  exports: [
    StudAddEditComponent,
    AlumnosComponent,
    AlumnosInfoComponent,
  ]
})
export class AlumnosModule { }
