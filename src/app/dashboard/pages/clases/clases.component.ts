import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, tap, map } from 'rxjs';
import { ClasesService } from 'src/app/dashboard/pages/clases/clases.service';
import { ClassAddEditComponent } from 'src/app/dashboard/pages/clases/class-add-edit/class-add-edit.component';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {
  clases: Observable<Array<any>>;
  displayedColumns: string[];
  titulo: string = "Clases ABM";

  constructor(
    private clasesService: ClasesService,
    private matDialog: MatDialog
  ) {
    this.clases = this.clasesService.getClases();
    this.displayedColumns = this.clasesService.displayedColumns;
  }



  getClases() {
    this.clases = this.clasesService.getClases();
  }

  deleteClase(clase: any) {
    this.clasesService.deleteClase(clase);
    this.getClases();
  }

  createClase(): void {
    this.matDialog
      .open(ClassAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.clasesService.createClase(v);
            this.getClases();
          } else {
          }
        },
      });
  }

  editClase(clase: any): void {
    this.matDialog
      .open(ClassAddEditComponent, { data: clase })
      .afterClosed()
      .subscribe({
        next: (claseUpdated) => {
          if (claseUpdated) {
            this.clasesService.editClase(clase, claseUpdated);
            this.getClases();
          }
        },
      });
  }

  applyFilter(event: Event) {
    //this.alumnosService.applyFilter(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.clases = this.clasesService.getClases().pipe(
      map((valor) => {
        return valor.filter( (clase: any) => {
          return clase.nombreClase.toLowerCase().startsWith(filterValue.toLowerCase());
        } );
      })
    );
  }
}
