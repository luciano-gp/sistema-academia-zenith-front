import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ITraining } from '../../interfaces/ITraining';
import { TrainingService } from '../../services/training.service';
import { FormTrainingComponent } from '../form-training/form-training.component';

@Component({
  selector: 'app-create-training',
  standalone: true,
  imports: [FormTrainingComponent],
  templateUrl: './create-training.component.html',
  styleUrl: './create-training.component.scss'
})
export class CreateTrainingComponent {
  private _trainingService = inject(TrainingService);
  private _snackbar = inject(MatSnackBar);
  private _router = inject(Router);

  async onSubmit(training: ITraining) {
    try {
      await this._trainingService.create(training);
      this._snackbar.open('Treino criado com sucesso', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/treinos');
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao criar treino', 'Fechar', { duration: 5000 });
    }
  }
}
