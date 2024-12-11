import { Component, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IClassOccurrence } from '../../../classes/interfaces/IClassOccurrence';
import { ScheduleService } from '../../services/schedule.service';
import { FormScheduleComponent } from '../form-schedule/form-schedule.component';

@Component({
  selector: 'app-edit-schedule',
  standalone: true,
  imports: [FormScheduleComponent],
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.scss'
})
export class EditScheduleComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _scheduleService = inject(ScheduleService);
  private _snackbar = inject(MatSnackBar);

  protected schedule = signal<IClassOccurrence>({} as IClassOccurrence);

  async ngOnInit() {
    const { id } = this._route.snapshot.params;

    const schedule = await this._scheduleService.getById(id);
    this.schedule.set(schedule);
  }

  onDelete() {
    if (this.schedule()?.id) {
      this._scheduleService.delete(this.schedule().id!);
      this._router.navigateByUrl('/agendamentos');
    }
  }

  async onSubmit(schedule: IClassOccurrence) {
    try {
      await this._scheduleService.edit(schedule);
      this._snackbar.open('Aula editada com sucesso', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/agendamentos');
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao editar aula', 'Fechar', { duration: 5000 });
    }
  }
}
