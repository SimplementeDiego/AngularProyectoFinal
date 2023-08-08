import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  displayedColumns: string[] = ['id', 'fullname', 'email', 'action'];

  estudiantes:any = [];

  constructor( private _http: HttpClient ) {

  }

  addAlumno(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/alumnos', data);
  }

  updateAlumno(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/alumnos/${id}`, data);
  }

  getAlumnoList(): Observable<any> {
    return this._http.get('http://localhost:3000/alumnos');
  }

  deleteAlumno(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/alumnos/${id}`);
  }

}
