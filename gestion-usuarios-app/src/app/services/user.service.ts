import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { IPagina } from '../interfaces/ipagina';
import { IUsuario } from '../interfaces/iusuario';

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

}