import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, UsuarioConId } from 'src/app/dashboard/pages/models';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  displayedColumns: string[] = ['id', 'usuario', 'email', 'action'];

  private _usuariosEmitidos$ = new BehaviorSubject<Array<UsuarioConId>>([]);
  public usuariosEmitidos$ = this._usuariosEmitidos$.asObservable();

  constructor( private _http: HttpClient, private router: Router, private dialog: MatDialog ) {

  }

  clear(){
    this._usuariosEmitidos$.next([]);
  }

  addUsuario(data: Usuario) {
    this._http.post(`${baseUrl}usuarios`, data).subscribe({
      next: ()=>{

        this.router.navigate(['/auth/login']);

        this.getUsuarioList();
      },
      error: ()=>{
        this.dialog.open(PopupComponent, {
          data: 'Ocurrio un error. Intentalo mas tarde.',
        });
      }
    });
  }

  updateUsuario(id: number, data: UsuarioConId) {
    this._http.put(`${baseUrl}usuarios/${id}`, data).subscribe({
      next:()=>{
        this.getUsuarioList();
      }
    });
  }

  getUsuarioList() {
    this._http.get<Array<UsuarioConId>>(`${baseUrl}usuarios`).subscribe({
      next: (res)=>{
        this._usuariosEmitidos$.next(res);
      }
    });
  }

  deleteUsuario(id: number) {
    this._http.delete(`${baseUrl}usuarios/${id}`).subscribe({
      next: ()=>{
        this.getUsuarioList();
      }
    });
  }

}
