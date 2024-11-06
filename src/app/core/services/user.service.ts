import { Injectable } from '@angular/core';
import { IUser } from '../../features/auth/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: IUser = {} as IUser;

  set setUser(user: IUser) {
    this._user = user;
  }

  get getUser(): IUser {
    return this._user;
  }

  get hasUser(): boolean {
    return !!this._user;
  }
}
