import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Curso, CursoConId } from 'src/app/dashboard/pages/models';
import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  displayedColumns: string[] = ['id', 'areaCurso', 'duracion', 'certificado','action'];

  constructor( private _http: HttpClient ) {

  }

  addCurso(data: Curso): Observable<Object> {
    return this._http.post(`${baseUrl}cursos`, data);
  }

  updateCurso(id: number, data: Curso): Observable<Object> {
    return this._http.put(`${baseUrl}cursos/${id}`, data);
  }

  getCursoList(): Observable<Array<CursoConId>> {
    return this._http.get<Array<CursoConId>>(`${baseUrl}cursos`);
  }

  deleteCurso(id: number): Observable<Object> {
    return this._http.delete(`${baseUrl}cursos/${id}`);
  }
}
