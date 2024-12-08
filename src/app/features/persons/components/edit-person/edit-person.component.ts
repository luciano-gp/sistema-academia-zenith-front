import { Component, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { IPerson } from '../../interfaces/IPerson';
import { PersonService } from '../../services/person.service';
import { FormPersonComponent } from '../form-person/form-person.component';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [FormPersonComponent],
  templateUrl: './edit-person.component.html',
  styleUrl: './edit-person.component.scss'
})
export class EditPersonComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _personService = inject(PersonService);
  private _snackbar = inject(MatSnackBar);

  protected person = signal<IPerson>({} as IPerson);

  async ngOnInit() {
    const { id } = this._route.snapshot.params;

    const person = await this._personService.getPersonById(id);
    person.email = person.usuario?.email || '';
    person.dt_nascimento = moment(person.dt_nascimento).format();
    this.person.set(person);
  }

  onDelete() {
    if (this.person()?.id) {
      this._personService.delete(this.person().id!);
      this._router.navigateByUrl('/pessoas');
    }
  }

  async onSubmit(person: IPerson) {
    try {
      await this._personService.edit(person);
      this._snackbar.open('Pessoa editada com sucesso', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/pessoas');
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao editar pessoa', 'Fechar', { duration: 5000 });
    }
  }
}
