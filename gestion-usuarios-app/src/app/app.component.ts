import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginacionComponent } from "./components/paginacion/paginacion.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaginacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'gestion-usuarios-app';
}
