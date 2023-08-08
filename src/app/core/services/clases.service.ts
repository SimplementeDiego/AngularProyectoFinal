import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  displayedColumns: string[] = ['id', 'nombreClase', 'cantidadAlumnos', 'profesor','action'];

  clases = [];

  constructor( private _http: HttpClient ) {

  }

  addClase(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/clases', data);
  }

  updateClase(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/clases/${id}`, data);
  }

  getClaseList(): Observable<any> {
    return this._http.get('http://localhost:3000/clases');
  }

  deleteClase(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/clases/${id}`);
  }
}
