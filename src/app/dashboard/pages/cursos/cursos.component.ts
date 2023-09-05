import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { CursosService } from '../../../core/services/cursos.service';
import { CursosAddEditComponent } from './cursos-add-edit/cursos-add-edit.component';
import { PopupVerifyComponent } from 'src/app/shared/components/popup-verify/popup-verify.component';
import { CursosInfoComponent } from './cursos-info/cursos-info.component';
import { CursoConId } from '../models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit, OnDestroy {
  cursos: Observable<Array<CursoConId>>;
  displayedColumns: string[];
  titulo: string = 'Cursos ABM';

  constructor(
    private cursosService: CursosService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
  ) {
    this.cursos = this.cursosService.cursosEmitidos$
    this.displayedColumns = this.cursosService.displayedColumns;
  }

  ngOnInit(): void {
    this.getCursos();
  }

  ngOnDestroy(): void {
    this.cursosService.clear();
  }

  showButton(event: CursoConId){
    this.matDialog.open(CursosInfoComponent, { data: event })
  }

  getCursos() {
    this.cursosService.getCursoList();
  }

  deleteCurso(id: number) {
    this.verifyDialog
      .open(PopupVerifyComponent)
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.cursosService.deleteCurso(id)
          }
        },
      });
  }

  createCurso(): void {
    this.matDialog.open(CursosAddEditComponent)
  }

  editCurso(curso: CursoConId): void {
    this.matDialog.open(CursosAddEditComponent, { data: curso })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cursos = this.cursosService.cursosEmitidos$.pipe(
      map((valor) => {
        return valor.filter((curso: CursoConId) => {
          return curso.areaCurso.toLowerCase().startsWith(filterValue.toLowerCase());
        });
      })
    );
  }
}
