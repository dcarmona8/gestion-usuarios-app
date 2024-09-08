import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dividirApellidos',
  standalone: true
})
export class DividirApellidosPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const words = value.split(' ');
    if (words.length > 3) {
      let posPrimerApellido:number = 2;
      if (words[1] == 'del') {
        posPrimerApellido = 3;
      }
      const firstName = words.slice(0, posPrimerApellido).join(' ');
      const lastNames = words.slice(posPrimerApellido).join(' '); // Los apellidos

      // Formatear: Nombre compuesto + "<br>" + apellidos
      return `${lastNames}`;
    } else {
      const firstName = words[0];
      const lastNames = words.slice(1).join(' ');
      return `${lastNames}`;
    }
  }

}
