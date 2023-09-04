import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { AlumnoConId, CursoConId } from '../../models';

@Component({
  selector: 'app-alumnos-info',
  templateUrl: './alumnos-info.component.html',
})
export class AlumnosInfoComponent implements OnInit {

  public cursosObservable: Observable<CursoConId[] | null>;

  public cursos: Array<CursoConId> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlumnoConId  ,private ref: MatDialogRef<AlumnosInfoComponent>, private _inscripcionesService: InscripcionesService){

    this.cursosObservable = this._inscripcionesService.cursosDeInscripciones$

    this._inscripcionesService.getCursosCompletos(data);

  }

  ngOnInit(): void {

    this.cursosObservable.subscribe({
      next: (res)=>{
        this.cursos = res || [];
      }
    });

  }

}
