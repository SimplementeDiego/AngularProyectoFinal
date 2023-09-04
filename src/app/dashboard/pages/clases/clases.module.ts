import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassAddEditComponent } from './class-add-edit/class-add-edit.component';
import { ClasesComponent } from './clases.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClasesRoutingModule } from './clases-routing.module';
import { InscripcionesInfoComponent } from './inscripciones-info/inscripciones-info.component';

@NgModule({
  declarations: [
    ClassAddEditComponent,
    ClasesComponent,
    InscripcionesInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClasesRoutingModule,
  ],
  exports: [
    ClassAddEditComponent,
    ClasesComponent,
    InscripcionesInfoComponent
  ]
})
export class ClasesModule { }
