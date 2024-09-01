import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [NgFor],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})

export class PaginacionComponent {
  userService = inject(UserService);

  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;
  @Output() cambioPagina = new EventEmitter<number>();

  async ngOnInit() {
    // Obtener el total de páginas desde el servicio y actualizar la propiedad
    try {
      const response = await this.userService.getTotalPaginas();
      this.totalPaginas = response.totalPaginas; // Asigna el número de páginas obtenido
    } catch (error) {
      console.error('Error al obtener el total de páginas:', error);
    }
  }

  cambiarPagina(pagina: number) {
    this.cambioPagina.emit(pagina);
  }
}
