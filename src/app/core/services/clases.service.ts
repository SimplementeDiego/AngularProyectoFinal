import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, map } from 'rxjs';
import { baseUrl } from 'src/environments/environments';
import { AlumnosService } from './alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { CursosService } from './cursos.service';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  displayedColumns: string[] = [
    'id',
    'alumnoInscripcion',
    'cursoInscripcion',
    'action',
  ];

  private _inscripciones$ = new BehaviorSubject<any | null>(null);
  public inscripciones$ = this._inscripciones$.asObservable();

  clases = [];

  constructor(
    private _http: HttpClient,
    private _alumnosService: AlumnosService,
    private dialog: MatDialog,
    private _cursosService: CursosService
  ) {}

  addClase(data: any): Observable<any> {
    return this._http.post(`${baseUrl}clases`, data);
  }

  updateClase(id: number, data: any): Observable<any> {
    return this._http.put(`${baseUrl}clases/${id}`, data);
  }

  getClaseList(): Observable<any> {
    return this._http.get(`${baseUrl}clases`);
  }

  getCursosCompletos(data: any) {
    const cantidad = data.length;

    let cursosConInfo: Array<any> = [];

    this.getClaseList().subscribe({
      next: (inscripciones: Array<any>) => {
        this._cursosService.getCursoList().subscribe({
          next: (cursos: Array<any>) => {
            const filtrado = inscripciones.filter((item) => {
              if (item.alumno == data.id) {
                return item;
              }
            });

            filtrado.forEach((inscripcion) => {
              cursos.forEach((curso) => {
                if (curso.id == inscripcion.curso) {
                  cursosConInfo.push(curso);
                }
              });
            });

            this._inscripciones$.next(cursosConInfo);
          },
        });
      },
    });
  }

  getAlumnosCompletos(data: any) {

    let alumnosConInfo: Array<any> = [];

    this.getClaseList().subscribe({
      next: (inscripciones: Array<any>) => {
        this._alumnosService.getAlumnoList().subscribe({
          next: (alumnos: Array<any>) => {
            const filtrado = inscripciones.filter((item) => {
              if (item.curso == data.id) {
                return item;
              }
            });

            filtrado.forEach((inscripcion) => {
              alumnos.forEach((alumno) => {
                if (alumno.id == inscripcion.alumno) {
                  alumnosConInfo.push(alumno);
                }
              });
            });
            this._inscripciones$.next(alumnosConInfo);
          },
        });
      },
    });
  }

  deleteInscripcionesAlumno(id: number) {
    this._http.get(`${baseUrl}clases`).subscribe({
      next: (res: any) => {
        res.forEach((element: any) => {
          if (id == element.alumno) {
            this.deleteClase(element.id).subscribe();
          }
        });

        this.dialog.open(PopupComponent, {
          data: `Eliminadas ${res.length} inscripciones.`,
        });
      },
    });
  }

  deleteClase(id: number): Observable<any> {
    return this._http.delete(`${baseUrl}clases/${id}`);
  }
}
