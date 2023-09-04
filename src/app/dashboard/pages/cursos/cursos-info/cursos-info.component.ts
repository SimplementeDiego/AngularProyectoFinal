import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { AlumnoConId, CursoConId } from '../../models';

@Component({
  selector: 'app-cursos-info',
  templateUrl: './cursos-info.component.html',
  styleUrls: ['./cursos-info.component.css']
})
export class CursosInfoComponent {

  public alumnos: Array<AlumnoConId> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: CursoConId  ,private ref: MatDialogRef<CursosInfoComponent>, private _inscripcionesService: InscripcionesService){

    this._inscripcionesService.alumnosDeInscripciones$.subscribe({
      next: (res)=>{
        this.alumnos = res || [];
      }
    });
    this._inscripcionesService.getAlumnosCompletos(data);

  }

}
