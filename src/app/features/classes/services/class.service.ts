import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IClass } from '../interfaces/IClass';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
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

  async getById(id: number) {
    return await lastValueFrom(
      this.http.get<IClass>(`${this.apiUrl}/aula/view/${id}`)
    );
  }

  async getAll() {
    return (
      await lastValueFrom(this.http.get<IClass[]>(`${this.apiUrl}/aula`))
    )?.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  async delete(id: number) {
    return await lastValueFrom(
      this.http.delete(`${this.apiUrl}/aula/delete/${id}`)
    );
  }
}
