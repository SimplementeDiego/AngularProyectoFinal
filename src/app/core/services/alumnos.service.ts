import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, AlumnoConId } from 'src/app/dashboard/pages/models';

import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  displayedColumns: string[] = ['id', 'fullname', 'email', 'action'];

  constructor( private _http: HttpClient ) {

  }

  addAlumno(data: Alumno): Observable<Object> {
    return this._http.post(`${baseUrl}alumnos`, data);
  }

  updateAlumno(id: number, data: Alumno): Observable<Object> {
    return this._http.put(`${baseUrl}alumnos/${id}`, data);
  }

  getAlumnoList(): Observable<AlumnoConId[]> {
    return this._http.get<AlumnoConId[]>(`${baseUrl}alumnos`);
  }

  deleteAlumno(id: number): Observable<Object> {
    return this._http.delete(`${baseUrl}alumnos/${id}`);
  }

}
