import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClasesComponent } from './dashboard/pages/clases/clases.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';

const routes: Routes = [
  { path:'alumnos', component: AlumnosComponent},
  { path:'clases', component: ClasesComponent},
  { path:'cursos', component: CursosComponent},
  { path:'**', component: AlumnosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
