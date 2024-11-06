import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const _userService = inject(UserService);
  
  if (_userService.hasUser) {
    return true;
  }

  return false;
};
