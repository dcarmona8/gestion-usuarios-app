import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { PaginacionComponent } from "../paginacion/paginacion.component";
import { UsuariosListaComponent } from "../usuarios-lista/usuarios-lista.component";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, PaginacionComponent, UsuariosListaComponent, HomeComponent],
  providers: [NavbarComponent, PaginacionComponent, UsuariosListaComponent, HomeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

}
