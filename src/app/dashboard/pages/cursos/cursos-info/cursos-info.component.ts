import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { AlumnoConId, CursoConId, InscripciónConInfoConId } from '../../models';

@Component({
  selector: 'app-cursos-info',
  templateUrl: './cursos-info.component.html',
  styleUrls: ['./cursos-info.component.css']
})
export class CursosInfoComponent implements OnInit{

  public alumnos: Array<AlumnoConId> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: CursoConId  ,private ref: MatDialogRef<CursosInfoComponent>, private _inscripcionesService: InscripcionesService){

  }

  ngOnInit(): void {

    this._inscripcionesService.getInscripcionList();

    this._inscripcionesService.inscripcionesConInfoEmitidas$.subscribe({
      next: (inscripciones: InscripciónConInfoConId[])=>{

        this.alumnos = [];

        inscripciones = inscripciones.filter( (inscripcion)=>{
          if (inscripcion.curso.id == this.data.id){
            return inscripcion
          }else{
            return undefined
          }
        } );



        inscripciones.forEach( (inscripcion)=>{
          this.alumnos.push(inscripcion.alumno);
        } );

      }
    })

  }

}

