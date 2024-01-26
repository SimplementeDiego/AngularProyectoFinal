import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, concat } from 'rxjs';
import { Alumno, AlumnoConId, InscripciónConId } from 'src/app/dashboard/pages/models';
import { CargaComponent } from 'src/app/shared/components/carga/carga.component';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  displayedColumns: string[] = ['id', 'fullname', 'email', 'action'];

  private _alumnosEmitidos$ = new BehaviorSubject<Array<AlumnoConId>>([]);
  public alumnosEmitidos$ = this._alumnosEmitidos$.asObservable();

  constructor( private _http: HttpClient, private snackbar: MatSnackBar, private _dialog: MatDialog ) {

  }

  clear(){
    this._alumnosEmitidos$.next([]);
  }

  addAlumno(data: Alumno) {
    this._http.post(`${baseUrl}alumnos`, data).subscribe({
      next: ()=>{
        this.snackbar.open("Alumno Agregado", "Cerrar",{duration:5000});
        this.getAlumnoList();
      },
      error: ()=>{
        this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
      }
    });;
  }

  updateAlumno(id: number, data: Alumno) {
    this._http.put(`${baseUrl}alumnos/${id}`, data).subscribe({
      next: ()=>{
        this.snackbar.open("Alumno Modificado", "Cerrar",{duration:5000});
        this.getAlumnoList();
      },
      error: ()=>{
        this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
      }
    });
  }

  getAlumnoList() {
    let DialogVar = this._dialog.open(CargaComponent);
    this._http.get<AlumnoConId[]>(`${baseUrl}alumnos`).subscribe({
      next: (res)=>{
        this._alumnosEmitidos$.next(res);
        DialogVar.close();
      },
      error: ()=>{
        DialogVar.close();
        this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
      }
    });
  }

  deleteAlumno(id: number) {

    this._http.get<Array<InscripciónConId>>(`${baseUrl}inscripciones?alumno=${id}`).subscribe({
      next: (res)=>{

        if (res.length == 0){

          this._http.delete(`${baseUrl}alumnos/${id}`).subscribe({
            next: ()=>{
              this.getAlumnoList();
              this.snackbar.open("Alumno Eliminado", "Cerrar",{duration:5000});
            },
            error: ()=>{
              this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
            }
          });

        }else{

          this._dialog.open(PopupVerifyComponent, { data: "El alumno tiene inscripciones relacionadas. Desea eliminar las inscripciones y el alumno?" }).afterClosed().subscribe({
            next: (res)=>{
              if (res){
                this._http.get<Array<InscripciónConId>>(`${baseUrl}inscripciones?alumno=${id}`).subscribe({
                  next: (res)=>{

                    let observables: Observable<any>[] = [];

                    res.forEach( (elemento)=>{

                      observables.push(this._http.delete(`${baseUrl}inscripciones/${elemento.id.toString()}`));

                    } )

                    observables.push(this._http.delete(`${baseUrl}alumnos/${id}`))

                    concat(
                      ...observables
                    ).subscribe({
                      next: ()=>{
                        this.getAlumnoList();
                      }
                    });
                    this.snackbar.open("Alumno Eliminado", "Cerrar",{duration:5000});
                  }
                });

              }
            },
            error: ()=>{
              this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
            }
          });

        }
      }
    });

  }

}
