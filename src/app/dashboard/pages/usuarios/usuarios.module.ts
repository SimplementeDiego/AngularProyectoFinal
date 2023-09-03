import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    UserAddEditComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
  ],
  exports: [
    UsuariosComponent,
    UserInfoComponent
  ]
})
export class UsuariosModule { }
