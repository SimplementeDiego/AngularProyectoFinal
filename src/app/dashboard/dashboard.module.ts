import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { ClasesModule } from './pages/clases/clases.module';
import { RouterOutlet } from '@angular/router';
import { CursosModule } from './pages/cursos/cursos.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosModule,
    ClasesModule,
    RouterOutlet,
    CursosModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
