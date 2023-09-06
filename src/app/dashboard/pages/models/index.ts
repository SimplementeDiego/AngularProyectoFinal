export interface Alumno {
  email: string,
  firstName: string,
  lastName: string
}

export interface AlumnoConId extends Alumno {
  id: number
}


export interface Curso {
  areaCurso: string,
  duracion: string,
  certificado: string,
}

export interface CursoConId extends Curso {
  id: number
}

export interface Inscripción {
  curso: string,
  alumno: string
}

export interface InscripciónConId extends Inscripción {
  id: number
}

export interface InscripciónConInfo {
  alumno: AlumnoConId,
  curso: CursoConId,
}

export interface InscripciónConInfoConId extends InscripciónConInfo{
  id: number
}

export interface UsuarioLogIn {
  email: string,
  password: string
}

export interface Usuario extends UsuarioLogIn {
  usuario: string,

}

export interface UsuarioConId extends Usuario {
  rol: string,
  token: string,
  id: number
}

export interface UsuarioSinId extends Usuario{
  rol: string,
  token: string,
}

export interface Información {
  cantidadAlumnos: number,
  cantidadCursos: number,
  cantidadInscripciones: number
}
