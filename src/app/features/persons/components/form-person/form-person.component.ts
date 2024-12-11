import { NgIf } from "@angular/common";
import { Component, inject, input, output, SimpleChanges } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxMaskDirective } from "ngx-mask";

import dateToReq from "../../../../core/helpers/dateToReq";
import { CityService } from "../../../../core/services/city.service";

import { ITraining } from "../../../trainings/interfaces/ITraining";
import { TrainingService } from "../../../trainings/services/training.service";
import { IPerson } from "../../interfaces/IPerson";

@Component({
  selector: "app-form-person",
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    NgIf,
    MatNativeDateModule,
    NgxMaskDirective,
    MatTabsModule,
    MatTabsModule,
    MatExpansionModule,
    MatCheckboxModule,
  ],
  templateUrl: "./form-person.component.html",
  styleUrls: ["./form-person.component.scss"],
})
export class FormPersonComponent {
  private _fb = inject(FormBuilder);
  private _cityService = inject(CityService);
  private _trainingService = inject(TrainingService);

  done = output<IPerson>();
  delete = output<void>();
  person = input<IPerson>();
  cities = this._cityService.getCities;

  trainings: ITraining[] = [];
  filteredTrainings: ITraining[] = [];

  activeTab = 1;
  personForm: FormGroup;

  constructor() {
    this.personForm = this._fb.group({
      nome: ["", Validators.required],
      dt_nascimento: ["", Validators.required],
      cpf: [
        "",
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      endereco: [""],
      telefone: [
        "",
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      genero: [""],
      ref_cidade: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      treino: [""],
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes["person"]) {
      this.personForm.patchValue(this.person()!);

      this.trainings = await this._loadTrainings();
      const personTrainings = this.person()?.treino?.map((t) => t.id) || [];
      this.trainings.forEach((training) => {
        training.select = personTrainings.includes(training.id);
      });
      this.filteredTrainings = [...this.trainings];

      if (this.person()?.id) {
        this.personForm.controls["email"].disable();
      }
    }
  }

  private async _loadTrainings() {
    return await this._trainingService.getAll();
  }

  protected filterTrainings(filterValue: string) {
    const lowerFilter = filterValue.toLowerCase();
    this.filteredTrainings = this.trainings.filter((training) =>
      training.descricao.toLowerCase().includes(lowerFilter)
    );
  }

  protected toggleTraining(index: number) {
    this.trainings[index].select = !this.trainings[index].select;
  }

  async onSubmit() {
    if (this.personForm.valid) {
      const adjustedPerson: IPerson = {
        ...this.personForm.value,
        id: this.person()?.id || null,
        ref_usuario: this.person()?.ref_usuario || null,
        dt_nascimento: dateToReq(this.personForm.value.dt_nascimento, true),
        treino: this.trainings
          .filter((training) => training.select)
          .map((training) => ({
            ref_treino: training.id,
            dt_inicial: dateToReq(new Date(), true),
          })),
      };
      this.done.emit(adjustedPerson);
      console.log(
        "🚀 ~ FormPersonComponent ~ onSubmit ~ adjustedPerson:",
        adjustedPerson
      );
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
