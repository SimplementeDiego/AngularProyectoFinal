import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursosComponent } from './cursos.component';
import { CursosAddEditComponent } from '../cursos/cursos-add-edit/cursos-add-edit.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosInfoComponent } from './cursos-info/cursos-info.component';

@NgModule({
  declarations: [
    CursosComponent,
    CursosAddEditComponent,
    CursosInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
  ],
  exports: [
    CursosComponent,
    CursosAddEditComponent,
    CursosInfoComponent
  ]
})
export class CursosModule { }
