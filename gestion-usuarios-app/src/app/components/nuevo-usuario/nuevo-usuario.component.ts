// nuevo-usuario.component.ts
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUsuario } from '../../interfaces/iusuario';
declare var bootstrap: any; // Declaración para usar Bootstrap JS en Angular
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [FormsModule, NgIf],
  providers: [],
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})

export class NuevoUsuarioComponent {
  usuario: Partial<IUsuario> = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };
  isEditing: boolean = false;
  isToastVisible: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, public location: Location) {
    this.isToastVisible = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el id de la URL
    if (id) {
      this.isEditing = true; // Indica que estamos editando
      this.cargarUsuario(parseInt(id, 10)); // Carga los datos del usuario existente
    }
  }

  // Método para cargar los datos del usuario
  async cargarUsuario(id: number) {
    try {
      const usuarioConId = await this.userService.getUsuarioById(id);
      this.usuario = { ...usuarioConId.usuario }; // Carga los datos en el formulario
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      this.mostrarToast('Error al cargar los datos del usuario.');
    }
  }

  // Método para crear un usuario
  async crearUsuario() {
    let response:string = "";
    try {
      if (!this.isEditing) {
        // Espera la respuesta de la creación del usuario
        response = await this.userService.crearUsuario(this.usuario);
        // Muestra un mensaje de éxito en el Toast
        this.mostrarToast(`Usuario creado correctamente`);
      } else {
        // Espera la respuesta de la creación del usuario
        response = await this.userService.modificarUsuario(this.usuario);
        // Muestra un mensaje de éxito en el Toast
        this.mostrarToast(`${response}`);
      }
    } catch (error) {
      // Muestra un mensaje de error en el Toast
      this.mostrarToast('Error en usuario. Por favor, intenta de nuevo.');
    }
  }

  // Método para mostrar el Toast de notificación
  mostrarToast(mensaje: string) {
    const notificacionText = document.getElementById('notificacionText');
    const notificacionToast = new bootstrap.Toast(document.getElementById('notificacionToast'), { autohide: false });

    if (notificacionText) {
      notificacionText.innerText = mensaje;
    }

    this.isToastVisible = true;
    notificacionToast.show();
  }

  aceptar() {
    this.location.back();
  }
}
