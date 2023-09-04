import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, map } from 'rxjs';
import { baseUrl } from 'src/environments/environments';
import { AlumnosService } from './alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { CursosService } from './cursos.service';
import { AlumnoConId, CursoConId, Inscripción, InscripciónConId, InscripciónConInfoConId } from 'src/app/dashboard/pages/models';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  displayedColumns: string[] = [
    'id',
    'alumnoInscripcion',
    'cursoInscripcion',
    'action',
  ];

  private _inscripciones$ = new BehaviorSubject<Array<InscripciónConId> | null>(null);
  public inscripciones$ = this._inscripciones$.asObservable();

  private _cursosDeInscripciones$ = new BehaviorSubject<Array<CursoConId> | null>(null);
  public cursosDeInscripciones$ = this._cursosDeInscripciones$.asObservable();

  private _alumnosDeInscripciones$ = new BehaviorSubject<Array<AlumnoConId> | null>(null);
  public alumnosDeInscripciones$ = this._alumnosDeInscripciones$.asObservable();

  private _alumnosPorInscripcion$ = new BehaviorSubject<Array<InscripciónConInfoConId> | null>(null);
  public alumnosPorInscripcion$ = this._alumnosPorInscripcion$.asObservable();

  constructor(
    private _http: HttpClient,
    private _alumnosService: AlumnosService,
    private dialog: MatDialog,
    private _cursosService: CursosService
  ) {}

  addInscripcion( data: Inscripción ): Observable<Object> {
    return this._http.post(`${baseUrl}clases`, data);
  }

  updateInscripcion( id: number, data: Inscripción ): Observable<Object> {
    return this._http.put(`${baseUrl}clases/${id}`, data);
  }

  getInscripcionList(): Observable<Array<InscripciónConId>> {
    return this._http.get<Array<InscripciónConId>>(`${baseUrl}clases`);
  }

  getCursosCompletos(data: AlumnoConId) {

    let cursosConInfo: Array<CursoConId> = [];

    this.getInscripcionList().subscribe({
      next: (inscripciones: Array<InscripciónConId>) => {
        this._cursosService.getCursoList().subscribe({
          next: (cursos: Array<CursoConId>) => {

            const filtrado = inscripciones.filter((item) => {
              if (Number(item.alumno) == data.id) {
                return item;
              }else{
                return null;
              }
            });

            filtrado.forEach((inscripcion) => {
              cursos.forEach((curso) => {
                if (curso.id == Number(inscripcion.curso)) {
                  cursosConInfo.push(curso);
                }
              });
            });

            this._cursosDeInscripciones$.next(cursosConInfo);
          },
        });
      },
    });
  }

  getAlumnosPorInscripcion(){

    let array: Array<InscripciónConInfoConId> = [];

    this.getInscripcionList().subscribe({
      next: (res)=>{

        let cantidad = res.length

        res.forEach((clase: any) => {

          this._http
            .get(`${baseUrl}alumnos`, {
              params: {
                id: clase.alumno,
              },
            })
            .subscribe({
              next: (alumno: any) => {

                this._http.get(`${baseUrl}cursos`, {
                  params: {
                    id: clase.curso,
                  },
                }).subscribe( (curso: any)=>{

                  array.push({ id: clase.id, alumno: alumno[0], curso: curso[0] })

                  if (array.length==cantidad){
                    array = array.sort((a, b) => a.id - b.id);
                    this._alumnosPorInscripcion$.next(array);
                  }

                } );

              },
            });

        })

      }
    });

  }

  getAlumnosCompletos(data: CursoConId) {

    let alumnosConInfo: Array<AlumnoConId> = [];

    this.getInscripcionList().subscribe({
      next: (inscripciones: Array<InscripciónConId>) => {
        this._alumnosService.getAlumnoList().subscribe({
          next: (alumnos: Array<AlumnoConId>) => {
            const filtrado = inscripciones.filter((item) => {
              if (Number(item.curso) == data.id) {
                return item;
              }else{
                return null;
              }
            });

            filtrado.forEach((inscripcion) => {
              alumnos.forEach((alumno) => {
                if (alumno.id == Number(inscripcion.alumno)) {
                  alumnosConInfo.push(alumno);
                }
              });
            });
            this._alumnosDeInscripciones$.next(alumnosConInfo);
          },
        });
      },
    });
  }

  deleteInscripcionesAlumno(id: number) {
    this._http.get<Array<InscripciónConId>>(`${baseUrl}clases`).subscribe({
      next: (res: Array<InscripciónConId>) => {
        let cont: number = 0;
        res.forEach((element: InscripciónConId) => {
          if (id == Number(element.alumno)) {
            this.deleteInscripcion(element.id).subscribe();
            cont++;
          }
        });

        this.dialog.open(PopupComponent, {
          data: `Eliminadas ${cont} inscripciones.`,
        });
      },
    });
  }

  deleteInscripcion(id: number): Observable<Object> {
    return this._http.delete(`${baseUrl}clases/${id}`);
  }

}
