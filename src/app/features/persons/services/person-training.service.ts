import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { ITraining } from '../../trainings/interfaces/ITraining';

@Injectable({
  providedIn: 'root'
})
export class PersonTrainingService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async create(training: ITraining) {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/treino-pessoa/add`, training)
    );
  }

  async edit(training: ITraining) {
    return await lastValueFrom(
      this.http.put(`${this.apiUrl}/treino-pessoa/edit/${training.id}`, training)
    );
  }

  async getAll() {
    return (
      await lastValueFrom(this.http.get<ITraining[]>(`${this.apiUrl}/treino-pessoa`))
    )?.sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  async delete(id: number) {
    return await lastValueFrom(
      this.http.delete(`${this.apiUrl}/treino-pessoa/delete/${id}`)
    );
  }
}
