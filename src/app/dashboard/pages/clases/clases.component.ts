import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ClasesService } from 'src/app/core/services/clases.service';
import { ClassAddEditComponent } from 'src/app/dashboard/pages/clases/class-add-edit/class-add-edit.component';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { baseUrl } from 'src/environments/environments';
import { InscripcionesInfoComponent } from './inscripciones-info/inscripciones-info.component';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css'],
})
export class ClasesComponent {
  private _inscripciones$ = new BehaviorSubject<any | null>(null);
  public inscripciones$ = this._inscripciones$.asObservable();
  displayedColumns: string[];
  titulo: string = 'Inscripciones ABM';
  public array: Array<any> = [];

  constructor(
    private clasesService: ClasesService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar,
    private _http: HttpClient
  ) {
    this.getClases();
    this.displayedColumns = this.clasesService.displayedColumns;
  }

  showButton(evento: any){

    this.matDialog.open(InscripcionesInfoComponent, {data: evento})

  }

  getClases() {
    this.clasesService.getClaseList().subscribe({
      next: (res)=>{

        let cantidad = res.length

        res.forEach((clase: any) => {

          this._http
            .get(`${baseUrl}alumnos`, {
              params: {
                id: clase.alumno,
              },
            })
            .subscribe({
              next: (alumno: any) => {

                this._http.get(`${baseUrl}cursos`, {
                  params: {
                    id: clase.curso,
                  },
                }).subscribe( (curso: any)=>{

                  this.array.push({ id: clase.id, alumno: alumno[0], curso: curso[0] })

                  if (this.array.length==cantidad){
                    this.array = this.array.sort((a, b) => a.id - b.id);
                    this._inscripciones$.next(this.array);
                  }

                } );

              },
            });

        })

      }
    });
  }

  deleteClase(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.clasesService.deleteClase(id).subscribe({
              next: (res) => {
                this.snackbar.open('Clase Eliminada', 'Cerrar', {
                  duration: 5000,
                });

                this.array = []

                this.getClases();
              },
              error: (err) => {
                this.matDialog.open(PopupComponent, {
                  data: 'Ocurrio un error. Intentalo mas tarde.',
                });
              },
            });
          }
        },
      });
  }

  createClase(): void {
    this.matDialog
      .open(ClassAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.array = []
            this.getClases()
            this.snackbar.open('Clase Agregada', 'Cerrar', { duration: 5000 });
          }
        },
      });
  }

  editClase(clase: any): void {

    let aux = {id: clase.id, alumno: clase.alumno.id, curso: clase.curso.id}

    this.matDialog
      .open(ClassAddEditComponent, { data: aux })
      .afterClosed()
      .subscribe({
        next: (claseUpdated) => {
          if (claseUpdated) {
            this.clasesService.updateClase(clase, claseUpdated);
            this.snackbar.open('Clase Modificada', 'Cerrar', {
              duration: 5000,
            });
            this.array = []
            this.getClases();
          }
        },
      });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

    this._inscripciones$.next(this.array.filter( (value)=>{
      if ((value.alumno.firstName.toLowerCase().startsWith(filterValue.toLowerCase()))||(value.alumno.lastName.toLowerCase().startsWith(filterValue.toLowerCase()))||(value.curso.areaCurso.toLowerCase().startsWith(filterValue.toLowerCase()))){
        return value;
      }
    }));

  }
}
