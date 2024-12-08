import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CityService } from './core/services/city.service';
import { PayMethodService } from './core/services/pay-method.service';
import { AuthService } from './features/auth/services/auth.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatNativeDateModule, 
    MatButtonModule, 
    MatIconModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _authService = inject(AuthService);
  private _cityService = inject(CityService);
  private _payMethodService = inject(PayMethodService);

  title = 'sistema-academia-zenith-front';

  ngOnInit(): void {
    this._authService.login();
  }

  ngAfterContentInit(): void {
    this._cityService.getAll();
    this._payMethodService.getAll();
  }
}
