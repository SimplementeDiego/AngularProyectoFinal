import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClasesService } from 'src/app/core/services/clases.service';

@Component({
  selector: 'app-cursos-info',
  templateUrl: './cursos-info.component.html',
  styleUrls: ['./cursos-info.component.css']
})
export class CursosInfoComponent implements OnInit {

  public inscripciones$: Observable<any>;

  public alumnos: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any  ,private ref: MatDialogRef<CursosInfoComponent>, private _inscripcionesService: ClasesService){

    this.inscripciones$ = this._inscripcionesService.inscripciones$
    this._inscripcionesService.getAlumnosCompletos(data);

  }

  ngOnInit(): void {
    this.inscripciones$.subscribe({
      next: (res)=>{
        this.alumnos = res;
      }
    });
  }

}
