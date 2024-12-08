import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../../environments/environments";
import { IPersonResponse } from "../../../core/interfaces/responses/IPersonResponse";
import { IPerson } from "../interfaces/IPerson";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  person = signal({} as IPerson);

  async create (person: IPerson) {
    return await lastValueFrom(this.http.post(`${this.apiUrl}/pessoa/add`, person));
  }

  async edit (person: IPerson) {
    return await lastValueFrom(this.http.put(`${this.apiUrl}/pessoa/edit/${person.id}`, person));
  }

  async getAll() {
    return await lastValueFrom(
      this.http.get<IPerson[]>(`${this.apiUrl}/pessoa`)
    );
  }

  async getPersonById(id: number) {
    const person = await lastValueFrom(
      this.http.get<IPerson>(`${this.apiUrl}/pessoa/view/${id}`)
    );

    return person;
  }
  
  async getPersonByUserId(id: number) {
    const person = await lastValueFrom(
      this.http.get<IPersonResponse>(`${this.apiUrl}/pessoa/byUserId/${id}`)
    );

    return person.person || ({} as IPerson);
  }

  async delete(id: number) {
    return await lastValueFrom(this.http.delete(`${this.apiUrl}/pessoa/delete/${id}`));
  }

  get getPerson() {
    return this.person();
  }

  set setPerson(person: IPerson) {
    this.person.set(person);
  }
}
