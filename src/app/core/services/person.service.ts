import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IPerson } from '../../features/persons/interfaces/IPerson';
import { IPersonResponse } from '../interfaces/responses/IPersonResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  person = signal({} as IPerson);

  async getPersonById(id: number) {
    const person = await lastValueFrom(
      this.http.get<IPersonResponse>(`${this.apiUrl}/pessoa/byUserId/${id}`)
    );

    return person.person || {} as IPerson;
  }

  get getPerson() {
    return this.person();
  }

  set setPerson(person: IPerson) {
    this.person.set(person);
  }
}
