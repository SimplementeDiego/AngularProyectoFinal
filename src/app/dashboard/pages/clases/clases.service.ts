import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  displayedColumns: string[] = ['id', 'nombreClase', 'cantidadAlumnos', 'profesor','action'];

  clases = [
    {
      id: '1',
      nombreClase: 'Calculo',
      cantidadAlumnos: '234',
      profesor: 'Diego Furrer',
    },
    {
      id: '2',
      nombreClase: 'Geometria y Algebra Lineal',
      cantidadAlumnos: '567',
      profesor: 'Pedro Gomez',
    },
    {
      id: '3',
      nombreClase: 'Metodos Numericos',
      cantidadAlumnos: '279',
      profesor: 'Matilde Gonzalez',
    },
  ];

  private id: number = 3;

  constructor() {}

  getClases(): Observable<any> {

    let getClases$ = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.clases);
      }, 2);
    });

    return getClases$;
  }

  deleteClase(clase: any) {
    this.clases = this.clases.filter((u) => u.id !== clase.id);
  }

  createClase(v: any): void {
    this.clases = [
      ...this.clases,
      {
        id: (++this.id).toString(),
        nombreClase: v.nombreClase,
        cantidadAlumnos: v.cantidadAlumnos,
        profesor: v.profesor,
      },
    ];
  }

  editClase(claseP: any, classUpdated: any): void {
    this.clases = this.clases.map((clase) => {
      return clase.id === claseP.id
        ? { ...clase, ...classUpdated }
        : clase;
    });
  }
}
