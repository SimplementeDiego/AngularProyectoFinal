import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InfoActions } from './store/info.actions';
import { Observable } from 'rxjs';
import { selectInfoAlumnos, selectInfoCursos, selectInfoInscripciones } from './store/info.selectors';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{

  alumnosInfo$: Observable<number>;

  cursosInfo$: Observable<number>;

  inscripcionesInfo$: Observable<number>;

  titulo: string = "Información"

  constructor(private store: Store){

    this.alumnosInfo$ = this.store.select(selectInfoAlumnos);
    this.cursosInfo$ = this.store.select(selectInfoCursos);
    this.inscripcionesInfo$ = this.store.select(selectInfoInscripciones);

  }

  ngOnInit(): void {
    this.store.dispatch(InfoActions.loadAlumnos());
    this.store.dispatch(InfoActions.loadCursos());
    this.store.dispatch(InfoActions.loadInscripciones());
  }

}
