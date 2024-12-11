import { NgIf } from "@angular/common";
import { Component, inject, input, output, SimpleChanges } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { IClass } from "../../../classes/interfaces/IClass";
import { IClassOccurrence } from "../../../classes/interfaces/IClassOccurrence";
import { ClassService } from "../../../classes/services/class.service";

@Component({
  selector: "app-form-schedule",
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
  ],
  templateUrl: "./form-schedule.component.html",
  styleUrl: "./form-schedule.component.scss",
})
export class FormScheduleComponent {
  private _fb = inject(FormBuilder);
  private _classService = inject(ClassService);

  schedule = input<IClassOccurrence>();
  done = output<IClassOccurrence>();
  delete = output<void>();

  aulas: IClass[] = [];
  diasDaSemana = [
    { value: "Segunda-feira", label: "Segunda-feira" },
    { value: "Terça-feira", label: "Terça-feira" },
    { value: "Quarta-feira", label: "Quarta-feira" },
    { value: "Quinta-feira", label: "Quinta-feira" },
    { value: "Sexta-feira", label: "Sexta-feira" },
    { value: "Sábado", label: "Sábado" },
    { value: "Domingo", label: "Domingo" },
  ];

  ocorrenciaAulaForm: FormGroup;

  constructor() {
    this.ocorrenciaAulaForm = this._fb.group({
      ref_aula: ["", Validators.required],
      dia_semana: ["", Validators.required],
      vagas: [0, [Validators.required, Validators.min(1)]],
      horario_inicial: ["", Validators.required],
      horario_final: ["", Validators.required],
      profissional: ["", Validators.required],
    });
    
    this._loadAulas();
  }

  private async _loadAulas() {
    this.aulas = await this._classService.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["schedule"]) {
      this.ocorrenciaAulaForm.patchValue(this.schedule()!);
    }
  }

  async onSubmit() {
    if (this.ocorrenciaAulaForm.valid) {
      const ocorrenciaData: IClassOccurrence = {
        ...this.schedule(),
        ...this.ocorrenciaAulaForm.value,
      };
      this.done.emit(ocorrenciaData);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
