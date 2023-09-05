import { createFeature, createReducer, on } from '@ngrx/store';
import { InfoActions } from './info.actions';

export const infoFeatureKey = 'info';

export interface State {

  cantidadAlumnos:number,
  cantidadCursos: number,
  cantidadInscripciones: number

}

export const initialState: State = {

  cantidadAlumnos: 0,
  cantidadCursos: 0,
  cantidadInscripciones: 0

};

export const reducer = createReducer(
  initialState,

  //cargar alumnos
  on(InfoActions.loadAlumnos, state => (state)),

  on(InfoActions.loadAlumnosSuccess, (state, action) => {
    return {
      ...state,
      cantidadAlumnos: action.data.length,
    }
  }),

  on(InfoActions.loadAlumnosFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  //cargar cursos
  on(InfoActions.loadCursos, state => (state)),

  on(InfoActions.loadCursosSuccess, (state, action) => {
    return {
      ...state,
      cantidadCursos: action.data.length,
    }
  }),

  on(InfoActions.loadCursosFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  //cargar inscripciones
  on(InfoActions.loadInscripciones, state => (state)),

  on(InfoActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      cantidadInscripciones: action.data.length,
    }
  }),

  on(InfoActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),


);

export const infoFeature = createFeature({
  name: infoFeatureKey,
  reducer,
});

