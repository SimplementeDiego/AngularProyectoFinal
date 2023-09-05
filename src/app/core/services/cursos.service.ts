import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject, Observable, concat } from 'rxjs';
import { Curso, CursoConId, InscripciónConId } from 'src/app/dashboard/pages/models';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
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
    this._http.get<Array<InscripciónConId>>(`${baseUrl}clases?alumno=${id}`).subscribe({
      next: (res)=>{

        if (res.length == 0){

          this._http.delete(`${baseUrl}cursos/${id}`).subscribe({
            next: ()=>{
              this.getCursoList();
              this.snackbar.open("Alumno Eliminado", "Cerrar",{duration:5000});
            }
          });

        }else{

          this._dialog.open(PopupVerifyComponent, { data: "El curso tiene inscripciones relacionadas. Desea eliminar las inscripciones y el curso?" }).afterClosed().subscribe({
            next: (res)=>{
              if (res){
                this._http.get<Array<InscripciónConId>>(`${baseUrl}clases?curso=${id}`).subscribe({
                  next: (res)=>{

                    let observables: Observable<any>[] = [];

                    res.forEach( (elemento)=>{

                      observables.push(this._http.delete(`${baseUrl}clases/${elemento.id.toString()}`));

                    } )

                    observables.push(this._http.delete(`${baseUrl}cursos/${id}`))

                    concat(
                      ...observables
                    ).subscribe({
                      next: ()=>{
                        this.getCursoList();
                      }
                    });
                    this.snackbar.open("Alumno Eliminado", "Cerrar",{duration:5000});
                  }
                });

              }
            }
          });

        }
      }
    });

  }
}
