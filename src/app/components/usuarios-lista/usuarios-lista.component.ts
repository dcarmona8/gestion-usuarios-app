import { Component } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { NombreFormateadoPipe } from '../../pipes/nombre-formateado.pipe';
import { UsuarioDetalleComponent } from '../usuario-detalle/usuario-detalle.component';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [NgIf, NombreFormateadoPipe, UsuarioDetalleComponent, PaginacionComponent, NgClass],
  providers: [NgIf, NombreFormateadoPipe, UsuarioDetalleComponent, PaginacionComponent],
  templateUrl: './usuarios-lista.component.html',
  styleUrl: './usuarios-lista.component.css'
})

export class UsuariosListaComponent {
  arrUsuarios: IUsuario[] = [];
  usuarioSeleccionado: IUsuario | null = null;
  idEliminacion: number = 0;
  isError: boolean = false;
  first_nameDelete: string = "";

  pagina: number = 0;
  totalPaginas: number = 0;

  constructor(private router: Router, private userService: UserService) {}

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

  irADetalle(id: number): void {
    // Navega a la ruta "/user/id"
    this.router.navigate(['/user', id]);
  }

  irAActualizar(id: number): void {
    // Navega a la ruta "/user/id"
    this.router.navigate(['home/updateuser/', id]);
  }

  eliminarUsuario(id: number): void {
    this.idEliminacion = id;
    const confirmToast = new bootstrap.Toast(document.getElementById('confirmToast'));
    confirmToast.show();
  }

  // Método para confirmar la eliminación del usuario
  async confirmarEliminacion() {
    try {
      const notificacionToast = new bootstrap.Toast(document.getElementById('notificacionToast'));
      const notificacionText = document.getElementById("notificacionText");
      if (this.idEliminacion && notificacionText) {
        const response = await this.userService.deleteUsuario(this.idEliminacion);
        if ('error' in response) {
          // Si hay un error, muestra el mensaje de error
          notificacionText.innerText = String(response.error);
          this.isError = true;
        } else {
          // Si no hay error, muestra el mensaje de éxito con el nombre del usuario eliminado
          const userName = response.first_name ?? 'Usuario';
          notificacionText.innerText = `${userName} eliminado correctamente.`;
          this.isError = false;
        }
        notificacionToast.show();
      } else {
        console.error('Error al eliminar el usuario. Id no accesible.');
        alert('No se pudo eliminar el usuario. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      alert('No se pudo eliminar el usuario. Intenta nuevamente.');
    }
  }

}
