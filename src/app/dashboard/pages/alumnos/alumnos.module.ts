import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosAddEditComponent } from './alumnos-add-edit/alumnos-add-edit.component';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosInfoComponent } from './alumnos-info/alumnos-info.component';

@NgModule({
  declarations: [
    AlumnosAddEditComponent,
    AlumnosComponent,
    AlumnosInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule,
  ],
  exports: [
    AlumnosAddEditComponent,
    AlumnosComponent,
    AlumnosInfoComponent,
  ]
})
export class AlumnosModule { }
