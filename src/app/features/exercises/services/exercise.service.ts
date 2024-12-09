import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IExercise } from '../interfaces/IExercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async getById(id: string) {
    return await lastValueFrom(this.http.get<IExercise>(`${this.apiUrl}/exercicio/view/${id}`));
  }

  async getAll() {
    return await lastValueFrom(this.http.get<IExercise[]>(`${this.apiUrl}/exercicio`));
  }
}
