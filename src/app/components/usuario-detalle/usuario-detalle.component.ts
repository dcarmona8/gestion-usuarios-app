import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario';
import { DividirNombrePipe } from '../../pipes/dividir-nombre.pipe';
import { DividirApellidosPipe } from '../../pipes/dividir-apellidos.pipe';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [DividirNombrePipe, DividirApellidosPipe, NgClass, RouterLink, RouterOutlet],
  providers: [RouterLink],
  templateUrl: './usuario-detalle.component.html',
  styleUrl: './usuario-detalle.component.css'
})

export class UsuarioDetalleComponent {

  public usuario: Partial<IUsuario> = {};
  public isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private routeHome: Router,
    public routerLink: RouterLink,
    private usuarioService: UserService, // Servicio para obtener datos de usuarios,
  ) {

  }

  async ngOnInit(): Promise<void> {
    try {
      // Captura el parámetro 'id' de la URL
      const params = await firstValueFrom(this.route.paramMap);
      const id = Number(params.get('id'));

      if (id) {
        await this.cargarUsuario(id); // Espera la carga de los datos del usuario
      } else {
        console.error('ID de usuario no válido');
        this.irAHome(); // Fuerza la navegación a Home si el ID no es válido
      }
    } catch (error) {
      console.error('Error al cargar el componente:', error);
      this.irAHome(); // Fuerza la navegación a Home en caso de error
    }
  }

  async cargarUsuario(id: number): Promise<void> {
    // Aquí debes obtener el usuario desde el servicio
    try {
      const response = await this.usuarioService.getUsuarioById(id);
      this.usuario = response.usuario;
    } catch(error) {
      console.error('Error al cargar el usuario:', error);
    }
  }

  irAHome() {
    this.routeHome.initialNavigation();
    this.routeHome.navigateByUrl('/home');
  }

  // Método para mostrar el toast de confirmación
  eliminarUsuario() {
    const confirmToast = new bootstrap.Toast(document.getElementById('confirmToast'));
    confirmToast.show();
  }

  // Método para confirmar la eliminación del usuario
  async confirmarEliminacion() {
    try {
      const notificacionToast = new bootstrap.Toast(document.getElementById('notificacionToast'));
      const notificacionText = document.getElementById("notificacionText");
      if (this.usuario.id && notificacionText) {
        const response = await this.usuarioService.deleteUsuario(this.usuario.id);
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
