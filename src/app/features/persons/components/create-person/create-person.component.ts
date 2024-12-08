import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { IPerson } from '../../interfaces/IPerson';
import { PersonService } from '../../services/person.service';
import { FormPersonComponent } from '../form-person/form-person.component';

@Component({
  selector: 'app-create-person',
  standalone: true,
  imports: [FormPersonComponent],
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.scss'
})
export class CreatePersonComponent {
  private _personService = inject(PersonService);
  private _userService = inject(UserService);
  private _snackbar = inject(MatSnackBar);
  private _router = inject(Router);

  async onSubmit(plan: IPerson) {
    try {
      const newUser = await this._userService.create(plan.email!, plan.cpf.slice(0, 4));
      if (newUser.user?.id) {
        plan.ref_usuario = newUser.user.id;
        await this._personService.create(plan);
        this._snackbar.open('Pessoa cadastrada com sucesso', 'Fechar', { duration: 5000 });
        this._router.navigateByUrl('/pessoas');
      } else {
        this._snackbar.open('Erro ao cadastrar novo usuário', 'Fechar', { duration: 5000 });
      }
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao cadastrar pessoa', 'Fechar', { duration: 5000 });
    }
  }
}
