import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { IClassOccurrence } from '../../../classes/interfaces/IClassOccurrence';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-list-schedule',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './list-schedule.component.html',
  styleUrl: './list-schedule.component.scss'
})
export class ListScheduleComponent {
  private _scheduleService = inject(ScheduleService);
  private _snackbar = inject(MatSnackBar);

  displayedColumns: string[] = ['nome', 'dia', 'horario', 'professor', 'vagas', 'actions'];
  dataSource = new MatTableDataSource<IClassOccurrence>([]);

  async ngOnInit() {
    const classes = await this._scheduleService.getAll();
    this.dataSource.data = classes;
  }

  protected async delete(id: number) {
    await this._scheduleService.delete(id)
    this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
    this._snackbar.open('Aula excluída com sucesso!', 'Fechar', { duration: 5000 });
  }
}
