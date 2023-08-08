import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { StudAddEditComponent } from 'src/app/dashboard/pages/alumnos/stud-add-edit/stud-add-edit.component';
import { Observable, tap, map } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  estudiantes: Observable<Array<any>>;
  displayedColumns: string[];
  titulo: string = "Alumnos ABM";



  constructor(
    private alumnosService: AlumnosService,
    private matDialog: MatDialog
  ) {
    this.estudiantes = this.alumnosService.getAlumnoList();
    this.displayedColumns = this.alumnosService.displayedColumns;
  }

  getAlumnosList() {
    this.estudiantes = this.alumnosService.getAlumnoList()
  }

  deleteAlumno(id: number) {
    this.alumnosService.deleteAlumno(id).subscribe({
      next: (res) => {
        alert('Student deleted!');
        this.getAlumnosList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addAlumno(): void {
    this.matDialog
      .open(StudAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.getAlumnosList();
          } else {
          }
        },
      });
  }

  updateAlumno(student: any): void {
    this.matDialog
      .open(StudAddEditComponent, { data: student })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.getAlumnosList();
          }
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.estudiantes = this.alumnosService.getAlumnoList().pipe(
      map((valor) => {
        return valor.filter( (estudiante: any) => {
          return estudiante.firstName.toLowerCase().startsWith(filterValue.toLowerCase());
        } );
      })
    );
  }
}
