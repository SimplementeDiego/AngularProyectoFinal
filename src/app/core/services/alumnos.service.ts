import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  displayedColumns: string[] = ['id', 'fullname', 'email', 'action'];

  estudiantes:any = [];

  constructor( private _http: HttpClient ) {

  }

  addAlumno(data: any): Observable<any> {
    return this._http.post(`${baseUrl}alumnos`, data);
  }

  updateAlumno(id: number, data: any): Observable<any> {
    return this._http.put(`${baseUrl}alumnos/${id}`, data);
  }

  getAlumnoList(): Observable<any> {
    return this._http.get(`${baseUrl}alumnos`);
  }

  deleteAlumno(id: number): Observable<any> {
    return this._http.delete(`${baseUrl}alumnos/${id}`);
  }

}
