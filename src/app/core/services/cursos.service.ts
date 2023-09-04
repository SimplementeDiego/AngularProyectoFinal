import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject } from 'rxjs';
import { Curso, CursoConId, InscripciónConId } from 'src/app/dashboard/pages/models';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  displayedColumns: string[] = ['id', 'areaCurso', 'duracion', 'certificado','action'];

  private _cursosEmitidos$ = new BehaviorSubject<Array<CursoConId>>([]);
  public cursosEmitidos$ = this._cursosEmitidos$.asObservable();

  constructor( private _http: HttpClient, private snackbar: MatSnackBar, private _dialog: MatDialog ) {

  }

  clear(){
    this._cursosEmitidos$.next([]);
  }

  addCurso(data: Curso) {
    this._http.post(`${baseUrl}cursos`, data).subscribe({
      next: ()=>{
        this.getCursoList();
        this.snackbar.open("Curso Agregado", "Cerrar",{duration:5000});
      }
    });;
  }

  updateCurso(id: number, data: Curso) {
    this._http.put(`${baseUrl}cursos/${id}`, data).subscribe({
      next: ()=>{
        this.getCursoList();
        this.snackbar.open("Curso Modificado", "Cerrar",{duration:5000});
      }
    });
  }

  getCursoList() {
    this._http.get<Array<CursoConId>>(`${baseUrl}cursos`).subscribe({
      next: (res)=>{
        this._cursosEmitidos$.next(res);
      }
    });
  }

  deleteCurso(id: number) {
    this._http.get<Array<InscripciónConId>>(`${baseUrl}clases?cursos=${id}`).subscribe({
      next: (res)=>{

        if (res.length == 0){

          this._http.delete(`${baseUrl}cursos/${id}`).subscribe({
            next: ()=>{
              this.getCursoList();
              this.snackbar.open("Alumno Eliminado", "Cerrar",{duration:5000});
            }
          });

        }else{

          this._dialog.open(PopupComponent, { data: "No se puede eliminar. El Curso tiene inscripciones relacionadas." })

        }
      }
    });
  }
}
