import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { CursosService } from '../../../core/services/cursos.service';
import { CursosAddEditComponent } from './cursos-add-edit/cursos-add-edit.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  cursos: Observable<Array<any>>;
  displayedColumns: string[];
  titulo: string = "Cursos ABM";

  constructor(
    private cursosService: CursosService,
    private matDialog: MatDialog
  ) {
    this.cursos = this.cursosService.getCursoList();
    this.displayedColumns = this.cursosService.displayedColumns;
  }



  getCursos() {
    this.cursos = this.cursosService.getCursoList();
  }

  deleteCurso(id: number) {
    this.cursosService.deleteCurso(id).subscribe({
      next: (res) => {
        alert('Curso eliminado.');
        this.getCursos();
      },
      error: (err) => {
        console.log(err);
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
            this.getCursos();
          } else {
          }
        },
      });
  }

  editCurso(curso: any): void {
    this.matDialog
      .open(CursosAddEditComponent, { data: curso })
      .afterClosed()
      .subscribe({
        next: (cursoUpdated) => {
          if (cursoUpdated) {
            this.getCursos();
          }
        },
      });
  }

  applyFilter(event: Event) {
    //this.alumnosService.applyFilter(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.cursos = this.cursosService.getCursoList().pipe(
      map((valor) => {
        return valor.filter( (curso: any) => {
          return curso.areaCurso.toLowerCase().startsWith(filterValue.toLowerCase());
        } );
      })
    );
  }
}
