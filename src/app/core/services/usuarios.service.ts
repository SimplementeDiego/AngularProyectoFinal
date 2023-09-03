import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  displayedColumns: string[] = ['id', 'usuario', 'email', 'action'];

  cursos = [];

  constructor( private _http: HttpClient ) {

  }

  addUsuario(data: any): Observable<any> {
    return this._http.post(`${baseUrl}usuarios`, data);
  }

  updateUsuario(id: number, data: any): Observable<any> {
    return this._http.put(`${baseUrl}usuarios/${id}`, data);
  }

  getUsuarioList(): Observable<any> {
    return this._http.get(`${baseUrl}usuarios`);
  }

  deleteUsuario(id: number): Observable<any> {
    return this._http.delete(`${baseUrl}usuarios/${id}`);
  }

}
