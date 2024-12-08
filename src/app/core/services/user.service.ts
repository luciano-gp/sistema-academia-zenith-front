import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IUser } from '../../features/auth/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  private _user = signal({} as IUser);

  async create(email: string, senha: string) {
    const user: IUser = {
      id: null,
      email,
      senha,
      tipo: 3, // (1: admin, 2: personal, 3: usuario)
      ativo: true,
    };

    return await lastValueFrom(this.http.post<{message: string, user: IUser}>(`${this.apiUrl}/usuario/add`, user));    
  }

  set setUser(user: IUser) {
    this._user.set(user);
  }

  get getUser(): IUser {
    return this._user();
  }

  get hasUser(): boolean {
    return !!this._user()?.id;
  }
}
