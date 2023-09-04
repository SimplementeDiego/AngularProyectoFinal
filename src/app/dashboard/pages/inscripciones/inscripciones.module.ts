import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesAddEditComponent } from './inscripciones-add-edit/inscripciones-add-edit.component';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesInfoComponent } from './inscripciones-info/inscripciones-info.component';

@NgModule({
  declarations: [
    InscripcionesAddEditComponent,
    InscripcionesComponent,
    InscripcionesInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule,
  ],
  exports: [
    InscripcionesAddEditComponent,
    InscripcionesComponent,
    InscripcionesInfoComponent
  ]
})
export class InscripcionesModule { }
