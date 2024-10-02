import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async login(email: string, senha: string) {
    // Aqui você pode adicionar a lógica para chamar um serviço de autenticação
    // e retornar um Observable com a resposta
    return await lastValueFrom(this.http.post<IUser>(`${this.apiUrl}/usuario/login`, { email, senha }));
  }
}
