import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  displayedColumns: string[] = ['id', 'areaCurso', 'duracion', 'certificado','action'];

  cursos = [];

  constructor( private _http: HttpClient ) {

  }

  addCurso(data: any): Observable<any> {
    return this._http.post(`${baseUrl}cursos`, data);
  }

  updateCurso(id: number, data: any): Observable<any> {
    return this._http.put(`${baseUrl}cursos/${id}`, data);
  }

  getCursoList(): Observable<any> {
    return this._http.get(`${baseUrl}cursos`);
  }

  deleteCurso(id: number): Observable<any> {
    return this._http.delete(`${baseUrl}cursos/${id}`);
  }
}
