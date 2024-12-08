import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { ISubscription } from '../interfaces/ISubscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async create (subscription: ISubscription) {
    return await lastValueFrom(this.http.post(`${this.apiUrl}/contrato/add`, subscription));
  }

  async edit (subscription: ISubscription) {
    return await lastValueFrom(this.http.put(`${this.apiUrl}/contrato/edit/${subscription.id}`, subscription));
  }

  async getById(id: string) {
    return await lastValueFrom(this.http.get<ISubscription>(`${this.apiUrl}/contrato/view/${id}`));
  }

  async getAll() {
    return await lastValueFrom(this.http.get<ISubscription[]>(`${this.apiUrl}/contrato`));
  }

  async delete(id: number) {
    return await lastValueFrom(this.http.delete(`${this.apiUrl}/contrato/delete/${id}`));
  }
}
