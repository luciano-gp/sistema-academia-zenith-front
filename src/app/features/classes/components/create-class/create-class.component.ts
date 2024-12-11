import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IClass } from '../../interfaces/IClass';
import { ClassService } from '../../services/class.service';
import { FormClassesComponent } from '../form-class/form-class.component';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [FormClassesComponent],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss'
})
export class CreateClassComponent {
  private _classService = inject(ClassService);
  private _snackbar = inject(MatSnackBar);
  private _router = inject(Router);

  async onSubmit(classes: IClass) {
    try {
      await this._classService.create(classes);
      this._snackbar.open("Aula cadastrada com sucesso", "Fechar", {
        duration: 5000,
      });
      this._router.navigateByUrl("/aulas");
    } catch (err) {
      console.error(err);
      this._snackbar.open("Erro ao cadastrar aula", "Fechar", {
        duration: 5000,
      });
    }
  }
}
