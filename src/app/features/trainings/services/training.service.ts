import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "../../../../environments/environments";
import { ITraining } from "../interfaces/ITraining";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  async create(training: ITraining) {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/treino/add`, training)
    );
  }

  async edit(training: ITraining) {
    return await lastValueFrom(
      this.http.put(`${this.apiUrl}/treino/edit/${training.id}`, training)
    );
  }

  async getById(id: string) {
    return await lastValueFrom(
      this.http.get<ITraining>(`${this.apiUrl}/treino/view/${id}`)
    );
  }

  async getAll() {
    return (
      await lastValueFrom(this.http.get<ITraining[]>(`${this.apiUrl}/treino`))
    )?.sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  async delete(id: number) {
    return await lastValueFrom(
      this.http.delete(`${this.apiUrl}/treino/delete/${id}`)
    );
  }
}
