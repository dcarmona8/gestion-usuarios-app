import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { NombreFormateadoPipe } from '../../pipes/nombre-formateado.pipe';

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [NgIf, NombreFormateadoPipe],
  providers: [NgIf, NombreFormateadoPipe],
  templateUrl: './usuarios-lista.component.html',
  styleUrl: './usuarios-lista.component.css'
})

export class UsuariosListaComponent {
  arrUsuarios: IUsuario[] = [];
  pagina: number = 0;
  totalPaginas: number = 0;

  userService = inject(UserService);

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  async cargarUsuarios(pagina: number = 1) {
    try {
      const response = await this.userService.getUsuarios(pagina);
      this.pagina = response.pagina;
      this.totalPaginas = response.totalPaginas;
      this.arrUsuarios = response.usuarios;
    } catch (error) {
      console.log(error)
    }
  }

  verDetalle(usuario: IUsuario) {
    const modalRef = this.modalService.open(UsuarioDetalleComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.usuario = usuario; // Pasa el usuario seleccionado al modal
  }
  
}
