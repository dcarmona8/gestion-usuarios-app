import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [],
  templateUrl: './usuario-detalle.component.html',
  styleUrl: './usuario-detalle.component.css'
})
export class UsuarioDetalleComponent {
  @Input() usuario!: IUsuario;
}
