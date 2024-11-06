import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _userService = inject(UserService);

  protected hasUser = this._userService.hasUser;
}
