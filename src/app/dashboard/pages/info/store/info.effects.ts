import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InfoActions } from './info.actions';
import { HttpClient } from '@angular/common/http';
import { AlumnoConId, CursoConId, InscripciónConId } from '../../models';
import { baseUrl } from 'src/environments/environments';

@Injectable()
export class InfoEffects {

  constructor(private actions$: Actions, private _http: HttpClient) {}


  loadAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InfoActions.loadAlumnos),
      concatMap( () => this._http.get<AlumnoConId[]>(`${baseUrl}alumnos`).pipe(
        map(data => InfoActions.loadAlumnosSuccess({ data })),
        catchError(error => of(InfoActions.loadAlumnosFailure({ error })))))
      );
  });

  loadCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InfoActions.loadAlumnos),
      concatMap( () => this._http.get<Array<CursoConId>>(`${baseUrl}cursos`).pipe(
        map(data => InfoActions.loadCursosSuccess({ data })),
        catchError(error => of(InfoActions.loadCursosFailure({ error })))))
      );
  });

  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InfoActions.loadInscripciones),
      concatMap( () => this._http.get<Array<InscripciónConId>>(`${baseUrl}inscripciones`).pipe(
        map(data => InfoActions.loadInscripcionesSuccess({ data })),
        catchError(error => of(InfoActions.loadInscripcionesFailure({ error })))))
      );
  });


}
