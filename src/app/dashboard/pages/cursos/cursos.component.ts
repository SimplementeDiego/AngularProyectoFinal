import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { CursosService } from '../../../core/services/cursos.service';
import { CursosAddEditComponent } from './cursos-add-edit/cursos-add-edit.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosInfoComponent } from './cursos-info/cursos-info.component';
import { CursoConId } from '../models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent {
  cursos: Observable<Array<CursoConId>>;
  displayedColumns: string[];
  titulo: string = 'Cursos ABM';

  constructor(
    private cursosService: CursosService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.cursos = this.cursosService.getCursoList();
    this.displayedColumns = this.cursosService.displayedColumns;
  }

  showButton(event: CursoConId){
    this.matDialog.open(CursosInfoComponent, { data: event })
  }

  getCursos() {
    this.cursos = this.cursosService.getCursoList();
  }

  deleteCurso(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.cursosService.deleteCurso(id).subscribe({
              next: () => {
                this.snackbar.open("Curso Eliminado", "Cerrar",{duration:5000});
                this.getCursos();
              },
              error: () => {
                this.matDialog.open(PopupComponent, {
                  data: 'Ocurrio un error. Intentalo mas tarde.',
                });
              },
            });
          }
        },
      });
  }

  createCurso(): void {
    this.matDialog
      .open(CursosAddEditComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.snackbar.open("Curso Agregado", "Cerrar",{duration:5000});
            this.getCursos();
          } else {
          }
        },
      });
  }

  editCurso(curso: CursoConId): void {
    this.matDialog
      .open(CursosAddEditComponent, { data: curso })
      .afterClosed()
      .subscribe({
        next: (cursoUpdated) => {
          if (cursoUpdated) {
            this.snackbar.open("Curso Modificado", "Cerrar",{duration:5000});
            this.getCursos();
          }
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cursos = this.cursosService.getCursoList().pipe(
      map((valor) => {
        return valor.filter((curso: CursoConId) => {
          return curso.areaCurso
            .toLowerCase()
            .startsWith(filterValue.toLowerCase());
        });
      })
    );
  }
}
