import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../features/auth/interfaces/IUser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _userService = inject(UserService);
  private _router = inject(Router);

  protected hasUser = computed(() => this._userService.hasUser);
  protected user = computed(() => this._userService.getUser);

  logout() {
    this._userService.setUser = {} as IUser;
    this._router.navigateByUrl('/');
  }
}
