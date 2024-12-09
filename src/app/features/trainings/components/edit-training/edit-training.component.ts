import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ITraining } from '../../interfaces/ITraining';
import { TrainingService } from '../../services/training.service';
import { FormTrainingComponent } from '../form-training/form-training.component';

@Component({
  selector: 'app-edit-training',
  standalone: true,
  imports: [FormTrainingComponent],
  templateUrl: './edit-training.component.html',
  styleUrl: './edit-training.component.scss'
})
export class EditTrainingComponent {
  private _trainingService = inject(TrainingService);
  private _snackbar = inject(MatSnackBar);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  training: ITraining | undefined;

  async ngOnInit() {
    const id = this._route.snapshot.params['id'];
    this.training = await this._trainingService.getById(id);
  }

  async onSubmit(training: ITraining) {
    if (this.training) {
      await this._trainingService.edit(training);
      this._snackbar.open('Treino atualizado com sucesso!', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/treinos');
    }
  }

  async onDelete() {
    if (this.training) {
      await this._trainingService.delete(this.training.id!);
      this._snackbar.open('Treino deletado com sucesso!', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/treinos');
    }
  }
}
