import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';
import { ICity } from '../interfaces/ICity';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  private _cities = signal([] as ICity[]);

  async getAll() {
    const cities = await lastValueFrom(
      this.http.get<ICity[]>(`${this.apiUrl}/cidade`)
    );

    this.setCities = cities || [];
  }

  set setCities(cities: ICity[]) {
    this._cities.set(cities);
  }

  get getCities(): WritableSignal<ICity[]> {
    return this._cities;
  }
}
