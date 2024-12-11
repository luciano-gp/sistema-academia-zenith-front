import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { IClass } from '../../interfaces/IClass';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-list-class',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './list-class.component.html',
  styleUrl: './list-class.component.scss'
})
export class ListClassComponent {
  private _classService = inject(ClassService);
  private _snackbar = inject(MatSnackBar);

  displayedColumns: string[] = ['nome', 'descricao', 'actions'];
  dataSource = new MatTableDataSource<IClass>([]);

  async ngOnInit() {
    const classes = await this._classService.getAll();
    this.dataSource.data = classes;
  }

  protected async delete(id: number) {
    await this._classService.delete(id)
    this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
    this._snackbar.open('Aula excluída com sucesso!', 'Fechar', { duration: 5000 });
  }
}
