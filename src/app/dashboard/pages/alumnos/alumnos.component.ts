import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { StudAddEditComponent } from 'src/app/dashboard/pages/alumnos/stud-add-edit/stud-add-edit.component';
import { Observable, tap, map } from 'rxjs';
import { AlumnosService } from 'src/app/dashboard/pages/alumnos/alumnos.service';

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
    this.estudiantes = this.alumnosService.getStudents();
    this.displayedColumns = this.alumnosService.displayedColumns;
  }



  getStudents() {
    this.estudiantes = this.alumnosService.getStudents();
  }

  deleteStudent(student: any) {
    this.alumnosService.deleteStudent(student);
    this.getStudents();
  }

  createStudent(): void {
    this.matDialog
      .open(StudAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.alumnosService.createStudent(v);
            this.getStudents();
          } else {
          }
        },
      });
  }

  editStudent(student: any): void {
    this.matDialog
      .open(StudAddEditComponent, { data: student })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            this.alumnosService.editStudent(student, studentUpdated);
            this.getStudents();
          }
        },
      });
  }

  applyFilter(event: Event) {
    //this.alumnosService.applyFilter(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.estudiantes = this.alumnosService.getStudents().pipe(
      map((valor) => {
        return valor.filter( (estudiante: any) => {
          return estudiante.firstName.toLowerCase().startsWith(filterValue.toLowerCase());
        } );
      })
    );
  }
}
