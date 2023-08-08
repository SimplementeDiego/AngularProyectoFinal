import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TableComponent } from './components/table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [
    NombreCompletoPipe,
    HighlightDirective,
    NavbarComponent,
    SideNavComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    RouterOutlet,
    RouterModule,
  ],
  exports: [
    NombreCompletoPipe,
    HighlightDirective,
    NavbarComponent,
    SideNavComponent,
    TableComponent,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    RouterOutlet,
    RouterModule,
  ]
})
export class SharedModule { }
