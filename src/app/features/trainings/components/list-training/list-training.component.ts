import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ITraining } from '../../interfaces/ITraining';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-list-training',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './list-training.component.html',
  styleUrl: './list-training.component.scss'
})
export class ListTrainingComponent {
  private _trainingService = inject(TrainingService);

  private trainings = signal<ITraining[]>([]);

  protected displayedColumns: string[] = ['descricao', 'actions'];
  protected dataSource: MatTableDataSource<ITraining> = new MatTableDataSource<ITraining>(this.trainings());

  async ngOnInit() {
    const trainings = await this._trainingService.getAll();
    this.trainings.set(trainings);
    this.dataSource = new MatTableDataSource<ITraining>(trainings);
  }

  delete(id: number) {
    this._trainingService.delete(id).then(() => {
      this.trainings.set(this.trainings().filter(training => training.id !== id));
      this.dataSource = new MatTableDataSource<ITraining>(this.trainings());
    });
  }
}
