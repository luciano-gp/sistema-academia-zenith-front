import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { ILoginResponse } from '../../../core/interfaces/responses/ILoginResponse';
import { PersonService } from '../../../core/services/person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private _personService = inject(PersonService);

  private apiUrl = environment.apiUrl;

  async login(email?: string, senha?: string) {
    if (!email && !senha) {
      const storagedUser = localStorage.getItem('userZenith');
      if (storagedUser) {
        const parsedStoragedUser = JSON.parse(storagedUser);
        email = parsedStoragedUser.email;
        senha = parsedStoragedUser.senha;
      }
    }
    const user = await lastValueFrom(this.http.post<ILoginResponse>(`${this.apiUrl}/usuario/login`, { email, senha }));

    if (user.user) { 
      localStorage.setItem('userZenith', JSON.stringify({ email, senha }));
      
      this._personService.setPerson = await this._personService.getPersonById(user.user.id);
    }

    return user;
  }
}
