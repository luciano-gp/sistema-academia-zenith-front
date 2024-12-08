import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IPayMethod } from '../interfaces/IPayMethod';

@Injectable({
  providedIn: 'root'
})
export class PayMethodService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  private _payMethods = signal([] as IPayMethod[]);

  async getAll() {
    const payMethods = await lastValueFrom(
      this.http.get<IPayMethod[]>(`${this.apiUrl}/forma_pagamento`)
    );

    this.setPayMethods = payMethods || [];
  }

  set setPayMethods(payMethods: IPayMethod[]) {
    this._payMethods.set(payMethods);
  }

  get getPayMethods(): WritableSignal<IPayMethod[]> {
    return this._payMethods;
  }
}
