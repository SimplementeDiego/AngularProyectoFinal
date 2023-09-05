import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInfo from './info.reducer';

export const selectInfoState = createFeatureSelector<fromInfo.State>(
  fromInfo.infoFeatureKey
);

export const selectInfoAlumnos = createSelector(selectInfoState, (state)=>{return state.cantidadAlumnos})

export const selectInfoCursos = createSelector(selectInfoState, (state)=>{return state.cantidadCursos})

export const selectInfoInscripciones = createSelector(selectInfoState, (state)=>{return state.cantidadInscripciones})
