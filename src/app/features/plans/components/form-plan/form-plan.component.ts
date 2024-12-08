import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';
import dateToReq from '../../../../core/helpers/dateToReq';
import { IPlan } from '../../interfaces/IPlan';

@Component({
  selector: 'app-form-plan',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, NgIf, MatNativeDateModule, NgxMaskDirective],
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
      descricao: [''],
      dt_inicio: ['', Validators.required],
      dt_fim: [null],
      numero_meses_contrato: [null, [Validators.min(1)]],
      valor_mensal: ['', [Validators.required, Validators.min(0)]],
      modelo_contrato: ['', Validators.required],
      diarias: ['', [Validators.required, Validators.min(1), Validators.max(7)]]
    });

    this.setupValueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plan']) {
      this.planForm.patchValue(this.plan()!);
    }
  }

  private setupValueChanges() {
    this.planForm.get('numero_meses_contrato')!.valueChanges.subscribe((months) => {
      if (months) {
        const newEndDate = this.calculateEndDate(months);
        this.planForm.get('dt_fim')!.setValue(newEndDate, { emitEvent: false });
      }
    });

    this.planForm.get('dt_fim')!.valueChanges.subscribe((endDate) => {
      if (endDate) {
        const months = this.calculateMonths(endDate);
        this.planForm.get('numero_meses_contrato')!.setValue(months, { emitEvent: false });
      }
    });
  }

  private calculateEndDate(months: number): string {
    const day = new Date(this.planForm.get('dt_inicio')!.value);
    const endDate = new Date(day.setMonth(day.getMonth() + months));
    return endDate.toISOString();
  }

  private calculateMonths(endDate: string): number {
    const day = new Date(this.planForm.get('dt_inicio')!.value);
    const targetDate = new Date(endDate);
    const yearsDiff = targetDate.getFullYear() - day.getFullYear();
    const monthsDiff = targetDate.getMonth() - day.getMonth();
    return yearsDiff * 12 + monthsDiff;
  }

  async onSubmit() {
    if (this.planForm.valid) {
      const formValues = this.planForm.value;
      const plan: IPlan = {
        id: this.plan()?.id || null,
        titulo: formValues.titulo,
        descricao: formValues.descricao || null,
        dt_inicio: dateToReq(formValues.dt_inicio),
        dt_fim: formValues.dt_fim ? dateToReq(formValues.dt_fim) : '',
        numero_meses_contrato: formValues.numero_meses_contrato,
        valor_mensal: formValues.valor_mensal,
        modelo_contrato: formValues.modelo_contrato,
        diarias: formValues.diarias,
        ref_historico: 1
      };

      this.done.emit(plan);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
