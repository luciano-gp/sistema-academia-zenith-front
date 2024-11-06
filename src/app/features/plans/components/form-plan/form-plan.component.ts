import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IPlan } from '../../interfaces/IPlan';

@Component({
  selector: 'app-form-plan',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, NgIf, MatNativeDateModule],
  templateUrl: './form-plan.component.html',
  styleUrl: './form-plan.component.scss'
})
export class FormPlanComponent {
  private _fb = inject(FormBuilder);

  done = output<IPlan>();
  delete = output<void>();
  plan = input<IPlan>();

  planForm: FormGroup;

  contractModels = ['Padrão', 'Premium', 'Individual'];

  constructor() {
    this.planForm = this._fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dt_inicio: ['', Validators.required],
      dt_fim: ['', Validators.required],
      numero_meses_contrato: ['', [Validators.required, Validators.min(1)]],
      valor_mensal: ['', [Validators.required, Validators.min(0)]],
      modelo_contrato: ['', Validators.required],
      diarias: ['', Validators.required, Validators.min(0)]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plan']) {
      this.planForm.patchValue(this.plan()!);
    }
  }

  async onSubmit() {
    if (this.planForm.valid) {
      const formValues = this.planForm.value;
      const plan: IPlan = {
        id: this.plan()?.id || null,
        titulo: formValues.titulo,
        descricao: formValues.descricao,
        dt_inicio: formValues.dt_inicio,
        dt_fim: formValues.dt_fim,
        numero_meses_contrato: formValues.numero_meses_contrato,
        valor_mensal: formValues.valor_mensal,
        modelo_contrato: formValues.modelo_contrato,
        diarias: formValues.diarias
      };

      this.done.emit(plan);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
