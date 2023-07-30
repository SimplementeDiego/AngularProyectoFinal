import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  displayedColumns: string[] = ['id', 'areaCurso', 'duracion', 'certificado','action'];

  cursos = [
    {
      id: '1',
      areaCurso: 'JavaScript',
      duracion: '12 Meses',
      certificado: 'Si',
    },
    {
      id: '2',
      areaCurso: 'C++',
      duracion: '18 Meses',
      certificado: 'Si',
    },
    {
      id: '3',
      areaCurso: 'Python',
      duracion: '12 Meses',
      certificado: 'No',
    },
  ];

  private id: number = 3;

  constructor() {}

  getCursos(): Observable<any> {

    let getCursos$ = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.cursos);
      }, 2);
    });

    return getCursos$;
  }

  deleteCurso(curso: any) {
    this.cursos = this.cursos.filter((u) => u.id !== curso.id);
  }

  createCurso(v: any): void {
    this.cursos = [
      ...this.cursos,
      {
        id: (++this.id).toString(),
        areaCurso: v.areaCurso,
        duracion: v.duracion,
        certificado: v.certificado,
      },
    ];
  }

  editCurso(cursoP: any, cursoUpdated: any): void {
    this.cursos = this.cursos.map((curso) => {
      return curso.id === cursoP.id
        ? { ...curso, ...cursoUpdated }
        : curso;
    });
  }
}
