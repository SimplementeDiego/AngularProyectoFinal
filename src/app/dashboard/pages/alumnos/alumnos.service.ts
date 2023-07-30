import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  displayedColumns: string[] = ['id', 'fullname', 'email', 'action'];

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



  constructor() {}

  getStudents(): Observable<any> {

    let getStudents$ = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.estudiantes);
      }, 2);
    });

    return getStudents$;
  }

  deleteStudent(student: any) {
    this.estudiantes = this.estudiantes.filter((u) => u.id !== student.id);
  }

  createStudent(v: any): void {
    this.estudiantes = [
      ...this.estudiantes,
      {
        id: (++this.id).toString(),
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email,
      },
    ];
  }

  editStudent(student: any, studentUpdated: any): void {
    this.estudiantes = this.estudiantes.map((estudiante) => {
      return estudiante.id === student.id
        ? { ...estudiante, ...studentUpdated }
        : estudiante;
    });
  }

}
