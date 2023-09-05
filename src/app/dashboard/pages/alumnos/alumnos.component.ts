import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AlumnosAddEditComponent } from 'src/app/dashboard/pages/alumnos/alumnos-add-edit/alumnos-add-edit.component';
import { Observable, map } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { PopupVerifyComponent } from '../../../shared/components/popup-verify/popup-verify.component';
import { AlumnosInfoComponent } from './alumnos-info/alumnos-info.component';
import { AlumnoConId } from '../models';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit, OnDestroy{
  alumnos: Observable<Array<AlumnoConId>>;
  displayedColumns: string[];
  titulo: string = 'Alumnos ABM';

  constructor(
    private alumnosService: AlumnosService,
    private matDialog: MatDialog,
    private verifyDialog: MatDialog,
  ) {
    this.alumnos = this.alumnosService.alumnosEmitidos$;
    this.displayedColumns = this.alumnosService.displayedColumns;
  }

  ngOnInit(): void {
    this.getAlumnosList();
  }

  ngOnDestroy(): void {
    this.alumnosService.clear();
  }


  getAlumnosList() {
    this.alumnosService.getAlumnoList();
  }

  deleteAlumno( id: number ) {
    this.verifyDialog.open(PopupVerifyComponent).afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.alumnosService.deleteAlumno(id)
        }
      },
    });
  }

  addAlumno(): void {
    this.matDialog.open(AlumnosAddEditComponent);
  }

  showButton( alumno: AlumnoConId ){
    this.matDialog.open(AlumnosInfoComponent, { data:alumno });
  }

  updateAlumno( alumno: AlumnoConId ): void {
    this.matDialog.open(AlumnosAddEditComponent, { data: alumno })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.alumnos = this.alumnosService.alumnosEmitidos$.pipe(
      map((valor) => {
        return valor.filter((alumno: AlumnoConId) => {
          return alumno.firstName
            .toLowerCase()
            .startsWith(filterValue.toLowerCase());
        });
      })
    );
  }

}
