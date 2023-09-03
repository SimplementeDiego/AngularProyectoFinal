import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'alumnos', loadChildren: () => import("./pages/alumnos/alumnos.module").then((m) => m.AlumnosModule)},
  {path:'clases', loadChildren: () => import("./pages/clases/clases.module").then((m) => m.ClasesModule)},
  {path:'cursos', loadChildren: () => import("./pages/cursos/cursos.module").then((m) => m.CursosModule)},
  {path:'usuarios', loadChildren: () => import("./pages/usuarios/usuarios.module").then((m) => m.UsuariosModule)},
  { path:'**', redirectTo: 'alumnos' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
