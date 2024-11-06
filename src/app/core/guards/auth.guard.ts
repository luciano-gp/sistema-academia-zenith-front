import { inject, signal } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const _userService = inject(UserService);

  const hasUser = signal(() => _userService.hasUser);
  
  if (hasUser()) {
    return true;
  }

  return false;
};
