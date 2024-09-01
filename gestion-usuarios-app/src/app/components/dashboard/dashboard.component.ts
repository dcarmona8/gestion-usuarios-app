import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { PaginacionComponent } from "../paginacion/paginacion.component";
import { UsuariosListaComponent } from "../usuarios-lista/usuarios-lista.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, PaginacionComponent, UsuariosListaComponent],
  providers: [NavbarComponent, PaginacionComponent, UsuariosListaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

}
