import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudAddEditComponent } from '../shared/components/stud-add-edit/stud-add-edit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  estudiantes = [
    {
      id: '1',
      firstName: 'Diego',
      lastName: 'Furrer',
      email: 'diego@gmail.com',
    },
    {
      id: '2',
      firstName: 'Pedro',
      lastName: 'Varela',
      email: 'pedro@gmail.com',
    },
    {
      id: '3',
      firstName: 'German',
      lastName: 'Juan',
      email: 'German@gmail.com',
    },
  ];

  private id: number = 3;

  constructor(private matDialog: MatDialog) {}

  deleteStudent(student: any) {
    this.estudiantes = this.estudiantes.filter((u) => u.id !== student.id);
  }

  createStudent(): void {
    this.matDialog
      .open(StudAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.estudiantes = [
              ...this.estudiantes,
              {
                id: (++this.id).toString(),
                firstName: v.firstName,
                lastName: v.lastName,
                email: v.email,
              },
            ];
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
            this.estudiantes = this.estudiantes.map((estudiante) => {
              return estudiante.id === student.id
                ? { ...estudiante, ...studentUpdated }
                : estudiante;
            });
          }
        },
      });
  }


}
