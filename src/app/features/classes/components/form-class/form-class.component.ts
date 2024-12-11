import { NgIf } from "@angular/common";
import { Component, inject, input, output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { IClass } from "../../interfaces/IClass";

@Component({
  selector: "app-form-class",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: "./form-class.component.html",
  styleUrl: "./form-class.component.scss",
})
export class FormClassesComponent {
  private _fb = inject(FormBuilder);

  class = input<IClass>();
  done = output<IClass>();
  delete = output<void>();

  classForm: FormGroup;

  constructor() {
    this.classForm = this._fb.group({
      nome: ['', Validators.required],
      descricao: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['class']) {
      this.classForm.patchValue(this.class()!);
    }
  }

  async onSubmit() {
    if (this.classForm.valid) {
      const classData: IClass = {
        ...this.class(),
        ...this.classForm.value,
      };
      this.done.emit(classData);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
