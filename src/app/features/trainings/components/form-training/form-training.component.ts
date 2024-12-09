import { NgIf } from '@angular/common';
import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IExercise } from '../../../exercises/interfaces/IExercise';
import { ExerciseService } from '../../../exercises/services/exercise.service';
import { ITraining, ITrainingExerciseConfig } from '../../interfaces/ITraining';

interface ExerciseConfig {
  selected: FormControl<boolean | null>;
  num_series: FormControl<number | null>;
  num_repeticoes: FormControl<number | null>;
  carga: FormControl<number | null>;
  observacao: FormControl<string | null>;
}

@Component({
  selector: 'app-form-training',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './form-training.component.html',
  styleUrls: ['./form-training.component.scss'],
})
export class FormTrainingComponent {
  private _fb = inject(FormBuilder);
  private _exerciseService = inject(ExerciseService);

  training = input<ITraining>();
  done = output<ITraining>();
  delete = output<void>();

  trainingForm: FormGroup;
  exercises: IExercise[] = [];
  exerciseConfigs: Record<number, FormGroup<ExerciseConfig>> = {};

  constructor() {
    this.trainingForm = this._fb.group({
      descricao: ['', Validators.required],
    });
    this._loadExercises();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['training'] && this.training) {
      this.trainingForm.patchValue(this.training);
    }
  }

  private async _loadExercises() {
    this.exercises = await this._exerciseService.getAll();
    this._initializeExerciseConfigs();
  }

  private _initializeExerciseConfigs() {
    this.exercises.forEach((exercise) => {
      this.exerciseConfigs[exercise.id] = this._fb.group<ExerciseConfig>({
        selected: this._fb.control(false),
        num_series: this._fb.control(null, Validators.required),
        num_repeticoes: this._fb.control(null),
        carga: this._fb.control(null),
        observacao: this._fb.control(''),
      });
    });
  }

  isExerciseSelected(id: number): boolean {
    return !!this.exerciseConfigs[id]?.value.selected;
  }

  toggleExerciseSelection(id: number, isSelected: boolean) {
    if (isSelected) {
      this.exerciseConfigs[id].enable();
    } else {
      this.exerciseConfigs[id].disable();
    }
    this.exerciseConfigs[id].controls.selected.setValue(isSelected);
  }

  async onSubmit() {
    if (this.trainingForm.valid) {
      const formValue = this.trainingForm.value;

      const selectedExercises = this.exercises
        .filter((exercise) => this.isExerciseSelected(exercise.id))
        .map((exercise) => ({
          ...this.exerciseConfigs[exercise.id].value,
          ref_exercicio: exercise.id,
        } as ITrainingExerciseConfig));

      const training: ITraining = {
        ...this.training,
        descricao: formValue.descricao,
        exercicios: selectedExercises,
      };

      this.done.emit(training);
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
