import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { AlumnoConId, CursoConId, InscripciónConInfoConId } from '../../models';

@Component({
  selector: 'app-alumnos-info',
  templateUrl: './alumnos-info.component.html',
})
export class AlumnosInfoComponent implements OnInit {


  public cursos: Array<CursoConId> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlumnoConId  ,private ref: MatDialogRef<AlumnosInfoComponent>, private _inscripcionesService: InscripcionesService){


  }

  ngOnInit(): void {

    this._inscripcionesService.getInscripcionList();

    this._inscripcionesService.inscripcionesConInfoEmitidas$.subscribe({
      next: (inscripciones: InscripciónConInfoConId[])=>{

        this.cursos = [];

        inscripciones = inscripciones.filter( (inscripcion)=>{
          if (inscripcion.alumno.id == this.data.id){
            return inscripcion
          }else{
            return undefined
          }
        } );



        inscripciones.forEach( (inscripcion)=>{
          this.cursos.push(inscripcion.curso);
        } );

      }
    })

  }

}
