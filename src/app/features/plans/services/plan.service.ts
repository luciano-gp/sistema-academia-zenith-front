import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IPlan } from '../interfaces/IPlan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async create (plan: IPlan) {
    return await lastValueFrom(this.http.post(`${this.apiUrl}/plano/add`, plan));
  }

  async edit (plan: IPlan) {
    return await lastValueFrom(this.http.put(`${this.apiUrl}/plano/edit/${plan.id}`, plan));
  }

  async getById(id: string) {
    return await lastValueFrom(this.http.get<IPlan>(`${this.apiUrl}/plano/view/${id}`));
  }

  async getAll() {
    return await lastValueFrom(this.http.get<IPlan[]>(`${this.apiUrl}/plano`));
  }

  async delete(id: number) {
    return await lastValueFrom(this.http.delete(`${this.apiUrl}/plano/delete/${id}`));
  }
}
