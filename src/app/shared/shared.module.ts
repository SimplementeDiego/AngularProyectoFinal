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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './components/popup/popup.component';
import { PopupVerifyComponent } from './components/popup-verify/popup-verify.component';
import { PrimerLetraMayusc } from './pipes/primerLetraMayusc.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    NombreCompletoPipe,
    HighlightDirective,
    NavbarComponent,
    SideNavComponent,
    TableComponent,
    PopupComponent,
    PopupVerifyComponent,
    PrimerLetraMayusc
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
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule
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
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class SharedModule { }
