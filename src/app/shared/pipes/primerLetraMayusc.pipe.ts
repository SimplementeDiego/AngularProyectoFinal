import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayusc',
})
export class PrimerLetraMayusc implements PipeTransform {
  transform(param: any, ...args: unknown[]): unknown {
    if (!param) return param;
    return param[0].toUpperCase() + param.substr(1);
  }
}
