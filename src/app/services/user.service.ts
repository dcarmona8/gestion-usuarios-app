import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IPagina } from '../interfaces/ipagina';
import { IUsuario } from '../interfaces/iusuario';
import { map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://peticiones.online/api/users';
  private http = inject(HttpClient);

  async getUsuarios(pagina: number=1): Promise<{ pagina: number, totalPaginas: number, usuarios: IUsuario[] }> {
    const response = await firstValueFrom(this.http.get<IPagina>(`${this.apiUrl}?page=${pagina}`));
    const paginaActual = response.page;
    const totalPaginas = response.total_pages;
    const usuarios = response.results;
    return { pagina: paginaActual, totalPaginas, usuarios };
  }

  async getTotalPaginas(): Promise<{ totalPaginas: number}> {
    const response = await firstValueFrom(this.http.get<IPagina>(this.apiUrl));
    const totalPaginas = response.total_pages;

    return { totalPaginas };
  }

  async getUsuarioById(id: number=1): Promise<{ usuario: IUsuario}> {
    try {
      // Llama al método getUsuarios para obtener la lista de usuarios
      const { usuarios } = await this.getUsuarios();
      // Busca el usuario cuyo id coincide con el pasado por parámetro
      const usuario = usuarios.find(user => user.id === id);

      // Si no se encuentra el usuario, lanza un error
      if (!usuario) {
        throw new Error(`Usuario con id ${id} no encontrado.`);
      }

      return { usuario };
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw error; // Re-lanza el error para que se pueda manejar externamente
    }
  }

  // Método para eliminar un usuario por ID
  async deleteUsuario(id: number): Promise<IUsuario> {
    const response = await firstValueFrom(this.http.delete<IUsuario>(`${this.apiUrl}/${id}`));
    return response;
  }

  // Método para crear un nuevo usuario - devuelve un Promise
  async crearUsuario(usuario: Partial<IUsuario>): Promise<string> {
    return firstValueFrom(
      this.http.post(this.apiUrl, usuario, {
        responseType: 'text',
        observe: 'response'
      }).pipe(
        map((response: HttpResponse<string>) => {
          // Log de todo response para debugging
          console.log('Full response:', response);

          // Return the response body (which is the text)
          return response.body || '';
        })
      ))
  }

  // Método para crear un nuevo usuario - devuelve un Promise
  async modificarUsuario(usuario: Partial<IUsuario>): Promise<string> {
    return firstValueFrom(
      this.http.put(this.apiUrl, usuario, {
        responseType: 'text',
        observe: 'response'
      }).pipe(
        map((response: HttpResponse<string>) => {
          // Log de todo response para debugging
          console.log('Full response:', response);

          // Return the response body (which is the text)
          return response.body || '';
        })
      ))
  }

}