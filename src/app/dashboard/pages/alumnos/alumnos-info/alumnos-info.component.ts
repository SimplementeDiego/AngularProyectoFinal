import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClasesService } from 'src/app/core/services/clases.service';

@Component({
  selector: 'app-alumnos-info',
  templateUrl: './alumnos-info.component.html',
  styleUrls: ['./alumnos-info.component.css']
})
export class AlumnosInfoComponent implements OnInit {

  public cursosObservable: Observable<any>;

  public cursos: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any  ,private ref: MatDialogRef<AlumnosInfoComponent>, private _clasesService: ClasesService){

    this.cursosObservable = this._clasesService.inscripciones$

    this._clasesService.getCursosCompletos(data);

  }

  ngOnInit(): void {

    this.cursosObservable.subscribe({
      next: (res)=>{
        this.cursos = res;
      }
    });

  }

}
