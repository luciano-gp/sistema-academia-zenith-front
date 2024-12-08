import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import dateToReq from '../../../../core/helpers/dateToReq';
import { PayMethodService } from '../../../../core/services/pay-method.service';
import { IPerson } from '../../../persons/interfaces/IPerson';
import { PersonService } from '../../../persons/services/person.service';
import { IPlan } from '../../../plans/interfaces/IPlan';
import { PlanService } from '../../../plans/services/plan.service';
import { ISubscription } from '../../interfaces/ISubscription';

@Component({
  selector: 'app-form-subscription',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, NgIf, MatNativeDateModule, MatAutocompleteModule],
  templateUrl: './form-subscription.component.html',
  styleUrls: ['./form-subscription.component.scss'],
})
export class FormSubscriptionComponent {
  private _fb = inject(FormBuilder);
  private _personService = inject(PersonService);
  private _planService = inject(PlanService);
  private _payMethodService = inject(PayMethodService);

  done = output<ISubscription>();
  delete = output<void>();
  subscription = input<ISubscription>();

  subscriptionForm: FormGroup;
  persons: IPerson[] = [];
  filteredPersons: IPerson[] = [];
  plans: IPlan[] = [];
  payMethods = this._payMethodService.getPayMethods;

  constructor() {
    this.subscriptionForm = this._fb.group({
      dt_contratacao: ['', Validators.required],
      dt_final: [''],
      pessoa: ['', Validators.required],
      ref_plano: ['', Validators.required],
      pessoa_indicacao: [''],
      ref_forma_pagamento: ['', Validators.required],
    });
  }
  
  async ngOnInit() {
    this._loadInitialData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subscription']) {
      this.subscriptionForm.patchValue(this.subscription()!);
    }
  }

  private async _loadInitialData() {
    this.persons = await this._personService.getAll();
    this.filteredPersons = this.persons;
    this.plans = await this._planService.getAll();
  }

  protected filterPersons(value: Event) {
    const str = value.target as HTMLInputElement;
    const filterValue = str.value.toLowerCase();
    this.filteredPersons = this.persons?.filter(person =>
      person.nome.toLowerCase().includes(filterValue)
    );
  }

  protected selectPersons(id: number) {
    this.subscriptionForm.get('pessoa')?.setValue(id);
  }
  
  protected selectIndicationPersons(id: number) {
    this.subscriptionForm.get('pessoa_indicacao')?.setValue(id);
  }

  protected displayPerson(person: IPerson): string {
    return person ? person.nome : '';
  }

  async onSubmit() {
    if (this.subscriptionForm.valid) {
      const formValue = this.subscriptionForm.value;
      const subscription: ISubscription = {
        ...formValue,
        id: this.subscription()?.id || null,
        dt_contratacao: dateToReq(formValue.dt_contratacao),
        dt_final: formValue.dt_final ? dateToReq(formValue.dt_final) : null,
        ref_pessoa: formValue.pessoa?.id,
        ref_pessoa_indicacao: formValue.pessoa_indicacao?.id,
      };
      this.done.emit(subscription);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
