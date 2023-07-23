import { Component } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { StudAddEditComponent } from '../shared/components/stud-add-edit/stud-add-edit.component';
import { Observable, tap, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  estudiantes: Observable<Array<any>>;

  constructor(
    private alumnosService: AlumnosService,
    private matDialog: MatDialog
  ) {
    this.estudiantes = this.alumnosService.getStudents();
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
    console.log(filterValue)
    this.estudiantes = this.alumnosService.getStudents().pipe(
      map((valor) => {
        return valor.filter( (estudiante: any) => {
          return estudiante.firstName.startsWith(filterValue);
        } );
      })
    );
  }
}
