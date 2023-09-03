import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/environments/environments';
import { AlumnosService } from './alumnos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  displayedColumns: string[] = ['id', 'alumnoInscripcion', 'cursoInscripcion','action'];

  clases = [];

  constructor( private _http: HttpClient, private _alumnosService: AlumnosService, private dialog: MatDialog ) {

  }

  addClase(data: any): Observable<any> {
    return this._http.post(`${baseUrl}clases`, data);
  }

  updateClase(id: number, data: any): Observable<any> {
    return this._http.put(`${baseUrl}clases/${id}`, data);
  }

  getClaseList(): Observable<any> {
    return this._http.get(`${baseUrl}clases`);
  }

  deleteInscripcionesAlumno( id: number ){

    this._alumnosService.getAlumnoList().subscribe({
      next: (res: any) => {
        const USER: any[] = res.filter((obj: any) => {
          return obj.id === id;
        });
        if (
          USER.length != 0
        ) {

          this._http.get(`${baseUrl}clases`, {
            params: {
              alumno: res
            },
          })
          .subscribe({
              next: (res : any)=>{
                res.forEach((element : any) => {
                  this.deleteClase(element.id).subscribe();
                });

                this.dialog.open(PopupComponent, {
                  data: `Eliminadas ${res.length} inscripciones.`,
                });

              }
          });

        } else {
          this.dialog.open(PopupComponent, {
            data: 'Error.',
          });
        }
      },
      error: () => {
        this.dialog.open(PopupComponent, {
          data: 'Ocurrio un error. Intentalo mas tarde.',
        });
      },
    });

  }

  deleteClase(id: number): Observable<any> {
    return this._http.delete(`${baseUrl}clases/${id}`);
  }
}
