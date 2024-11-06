import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from "@angular/router";
import { UserService } from "../../../../core/services/user.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
  private _userService = inject(UserService);

  protected loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        const user = await this.authService.login(email, password);

        if (user?.user?.id) {
          this._userService.setUser = user.user;

          this.router.navigateByUrl("/dashboard");
        }

        this._snackBar.open(user.message);
      } catch (error: any) {
        this._snackBar.open(error?.error?.message || 'Algo inesperado aconteceu!');   
      }
    }
  }

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
}
