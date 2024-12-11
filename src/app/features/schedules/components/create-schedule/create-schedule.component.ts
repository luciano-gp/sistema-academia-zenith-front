import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IClassOccurrence } from '../../../classes/interfaces/IClassOccurrence';
import { ScheduleService } from '../../services/schedule.service';
import { FormScheduleComponent } from "../form-schedule/form-schedule.component";

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [FormScheduleComponent],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.scss'
})
export class CreateScheduleComponent {
  private _scheduleService = inject(ScheduleService);
  private _snackbar = inject(MatSnackBar);
  private _router = inject(Router);

  async onSubmit(classes: IClassOccurrence) {
    try {
      await this._scheduleService.create(classes);
      this._snackbar.open("Agenda cadastrada com sucesso", "Fechar", {
        duration: 5000,
      });
      this._router.navigateByUrl("/agendamentos");
    } catch (err) {
      console.error(err);
      this._snackbar.open("Erro ao cadastrar agenda", "Fechar", {
        duration: 5000,
      });
    }
  }
}
