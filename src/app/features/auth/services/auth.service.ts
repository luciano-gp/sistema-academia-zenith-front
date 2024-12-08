import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { ILoginResponse } from '../../../core/interfaces/responses/ILoginResponse';
import { UserService } from '../../../core/services/user.service';
import { PersonService } from '../../persons/services/person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private _personService = inject(PersonService);
  private _userService = inject(UserService);

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

      this._userService.setUser = user.user;
      this._personService.setPerson = await this._personService.getPersonByUserId(user.user.id!);
    }

    return user;
  }
}
