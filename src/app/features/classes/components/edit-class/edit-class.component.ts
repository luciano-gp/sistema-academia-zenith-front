import { Component, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IClass } from '../../interfaces/IClass';
import { ClassService } from '../../services/class.service';
import { FormClassesComponent } from '../form-class/form-class.component';

@Component({
  selector: 'app-edit-class',
  standalone: true,
  imports: [FormClassesComponent],
  templateUrl: './edit-class.component.html',
  styleUrl: './edit-class.component.scss'
})
export class EditClassComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _classService = inject(ClassService);
  private _snackbar = inject(MatSnackBar);

  protected classes = signal<IClass>({} as IClass);

  async ngOnInit() {
    const { id } = this._route.snapshot.params;

    const classes = await this._classService.getById(id);
    this.classes.set(classes);
  }

  onDelete() {
    if (this.classes()?.id) {
      this._classService.delete(this.classes().id!);
      this._router.navigateByUrl('/aulas');
    }
  }

  async onSubmit(classes: IClass) {
    try {
      await this._classService.edit(classes);
      this._snackbar.open('Aula editada com sucesso', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/aulas');
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao editar aula', 'Fechar', { duration: 5000 });
    }
  }
}
