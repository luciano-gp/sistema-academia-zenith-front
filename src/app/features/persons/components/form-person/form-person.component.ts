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
import { CityService } from '../../../../core/services/city.service';
import { IPerson } from '../../interfaces/IPerson';

@Component({
  selector: 'app-form-person',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, NgIf, MatNativeDateModule, NgxMaskDirective],
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent {
  private _fb = inject(FormBuilder);
  private _cityService = inject(CityService);

  done = output<IPerson>();
  delete = output<void>();
  person = input<IPerson>();
  cities = this._cityService.getCities;

  personForm: FormGroup;

  constructor() {
    this.personForm = this._fb.group({
      nome: ['', Validators.required],
      dt_nascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      endereco: [''],
      telefone: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      genero: [''],
      ref_cidade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person']) {
      this.personForm.patchValue(this.person()!);
    }
  }

  async onSubmit() {
    if (this.personForm.valid) {
      const adjustedPerson: IPerson = {
        ...this.personForm.value,
        id: this.person()?.id || null,
        dt_nascimento: dateToReq(this.personForm.value.dt_nascimento, true)
      };
      this.done.emit(adjustedPerson);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
