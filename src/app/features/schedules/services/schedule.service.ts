import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IClass } from '../../classes/interfaces/IClass';
import { IClassOccurrence } from '../../classes/interfaces/IClassOccurrence';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async create(training: IClass) {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/aula/add`, training)
    );
  }

  async edit(training: IClass) {
    return await lastValueFrom(
      this.http.put(`${this.apiUrl}/aula/edit/${training.id}`, training)
    );
  }

  async getById(id: string) {
    return await lastValueFrom(
      this.http.get<IClass>(`${this.apiUrl}/ocorrencia-aula/view/${id}`)
    );
  }

  async getAll() {
    return (
      await lastValueFrom(this.http.get<IClassOccurrence[]>(`${this.apiUrl}/ocorrencia-aula`))
    )?.sort((a, b) => a.aula.nome.localeCompare(b.aula.nome));
  }

  async delete(id: number) {
    return await lastValueFrom(
      this.http.delete(`${this.apiUrl}/aula/delete/${id}`)
    );
  }
}
