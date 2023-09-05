import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AlumnoConId, CursoConId, InscripciónConId } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

export const InfoActions = createActionGroup({
  source: 'Info',
  events: {

    'Load Alumnos': emptyProps(),
    'Load Alumnos Success': props<{ data: Array<AlumnoConId> }>(),
    'Load Alumnos Failure': props<{ error: HttpErrorResponse }>(),

    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: Array<CursoConId> }>(),
    'Load Cursos Failure': props<{ error: HttpErrorResponse }>(),

    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: Array<InscripciónConId> }>(),
    'Load Inscripciones Failure': props<{ error: HttpErrorResponse }>(),

  }
});
