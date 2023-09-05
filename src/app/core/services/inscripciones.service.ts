import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { baseUrl } from 'src/environments/environments';
import { AlumnoConId, CursoConId, Inscripción, InscripciónConId, InscripciónConInfoConId } from 'src/app/dashboard/pages/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  displayedColumns: string[] = [
    'id',
    'alumnoInscripcion',
    'cursoInscripcion',
    'action',
  ];

  private _inscripcionesEmitidas$ = new BehaviorSubject<Array<InscripciónConId>>([]);
  public inscripcionesEmitidas$ = this._inscripcionesEmitidas$.asObservable();

  private _inscripcionesConInfoEmitidas$ = new BehaviorSubject<Array<InscripciónConInfoConId>>([]);
  public inscripcionesConInfoEmitidas$ = this._inscripcionesConInfoEmitidas$.asObservable();

  constructor(
    private _http: HttpClient,
    private snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) {



  }

  clear(){
    this._inscripcionesEmitidas$.next([]);
    this._inscripcionesConInfoEmitidas$.next([]);
  }

  getInscripcionList() {
    this._http.get<Array<InscripciónConId>>(`${baseUrl}inscripciones`).subscribe({
      next: (inscripcionesEmitidas)=>{
        this._inscripcionesEmitidas$.next(inscripcionesEmitidas);

        let cantidad = inscripcionesEmitidas.length

        if (cantidad==0){
          this._inscripcionesConInfoEmitidas$.next([]);
        }

        this._http.get<AlumnoConId[]>(`${baseUrl}alumnos`).subscribe({
          next: (alumnosEmitidos)=>{


            this._http.get<Array<CursoConId>>(`${baseUrl}cursos`).subscribe({
              next: (cursosEmitidos)=>{

                let InscripcionesConInfo: InscripciónConInfoConId[] = [];

                inscripcionesEmitidas.forEach( (inscripcion: InscripciónConId)=>{

                  const alumno: AlumnoConId | undefined = alumnosEmitidos.find( (alumno: AlumnoConId) =>{
                    if (alumno.id == Number(inscripcion.alumno)){
                      return alumno;
                    }else{
                      return undefined;
                    }
                  })
                  const curso: CursoConId | undefined = cursosEmitidos.find( (curso: CursoConId)=>{
                    if (curso.id == Number(inscripcion.curso)){
                      return curso;
                    }else{
                      return undefined;
                    }
                  })

                  if (alumno){
                    if (curso){
                      const información = {
                        id: inscripcion.id,
                        alumno: alumno,
                        curso: curso
                      }

                      InscripcionesConInfo.push(información);

                    }
                  }

                } )

                this._inscripcionesConInfoEmitidas$.next(InscripcionesConInfo)

              },
              error: ()=>{
                this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
              }
            });

          },
          error: ()=>{
            this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
          }
        })

      },
      error: ()=>{
        this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
      }
    });
  }

  addInscripcion( data: Inscripción ) {
    return this._http.post(`${baseUrl}inscripciones`, data).subscribe({
      next: ()=>{
        this.getInscripcionList()
        this.snackbar.open("Inscripción Agregada", "Cerrar",{duration:5000});
      },
      error: ()=>{
        this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
      }
    });
  }

  updateInscripcion( id: number, data: Inscripción ) {
    this._http.put(`${baseUrl}inscripciones/${id}`, data).subscribe({
      next: ()=>{
        this.getInscripcionList()
        this.snackbar.open("Inscripción Modificada", "Cerrar",{duration:5000});
      },
      error: ()=>{
        this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
      }
    });
  }

  deleteInscripcion(id: number) {
    this._http.delete(`${baseUrl}inscripciones/${id}`).subscribe({
      next: ()=>{
        this.getInscripcionList()
        this.snackbar.open("Inscripción Eliminada", "Cerrar",{duration:5000});
      },
      error: ()=>{
        this._dialog.open(PopupComponent, { data: "Ocurrio un error inesperado. Intente nuevamente mas tarde." })
      }
    });
  }

}
