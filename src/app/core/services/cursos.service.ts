import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  displayedColumns: string[] = ['id', 'areaCurso', 'duracion', 'certificado','action'];

  cursos = [];

  constructor( private _http: HttpClient ) {

  }

  addCurso(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/cursos', data);
  }

  updateCurso(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/cursos/${id}`, data);
  }

  getCursoList(): Observable<any> {
    return this._http.get('http://localhost:3000/cursos');
  }

  deleteCurso(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/cursos/${id}`);
  }
}
