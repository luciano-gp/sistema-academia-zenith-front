import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../../environments/environments";
import { IClassOccurrence } from "../../classes/interfaces/IClassOccurrence";

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async create(training: IClassOccurrence) {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/ocorrencia-aula/add`, training)
    );
  }

  async edit(training: IClassOccurrence) {
    return await lastValueFrom(
      this.http.put(
        `${this.apiUrl}/ocorrencia-aula/edit/${training.id}`,
        training
      )
    );
  }

  async getById(id: string) {
    return await lastValueFrom(
      this.http.get<IClassOccurrence>(
        `${this.apiUrl}/ocorrencia-aula/view/${id}`
      )
    );
  }

  async getAll() {
    const weekDaysOrder = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ];
    return (
      await lastValueFrom(
        this.http.get<IClassOccurrence[]>(`${this.apiUrl}/ocorrencia-aula`)
      )
    )?.sort(
      (a, b) =>
        weekDaysOrder.indexOf(a.dia_semana) -
        weekDaysOrder.indexOf(b.dia_semana)
    );
  }

  async delete(id: number) {
    return await lastValueFrom(
      this.http.delete(`${this.apiUrl}/ocorrencia-aula/delete/${id}`)
    );
  }
}
