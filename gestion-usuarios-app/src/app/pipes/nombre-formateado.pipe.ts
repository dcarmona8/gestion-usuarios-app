import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreFormateado',
  standalone: true
})
export class NombreFormateadoPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const words = value.split(' ');
    if (words.length > 3) {
      const firstName = words[0];  // Primera parte del nombre
      let secondNameSinDel = words[1];
      let posPrimerApellido:number = 2;
      if (words[1] == 'del') {
        secondNameSinDel = words[2]; // Segunda parte del nombre compuesto sin 'del'
        posPrimerApellido = 3;
      }
      const secondName = secondNameSinDel;
      const lastNames = words.slice(posPrimerApellido).join(' '); // Los apellidos

      // Formatear: Primera letra del primer nombre + "." + segunda parte del nombre + apellidos
      return `${firstName.charAt(0)}. ${secondName} ${lastNames}`;
    }
    return value; // Devuelve el nombre sin cambios si no es necesario formatearlo
  }

}
