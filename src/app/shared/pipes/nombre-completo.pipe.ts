import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(estudiante: any, ...args: unknown[]): unknown {
    const fullName = `${estudiante.firstName} ${estudiante.lastName}`;
    return fullName;
  }

}
