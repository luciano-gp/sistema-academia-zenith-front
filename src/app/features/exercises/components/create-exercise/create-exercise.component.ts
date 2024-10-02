import { Component } from '@angular/core';
import { FormExerciseComponent } from "../form-exercise/form-exercise.component";

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [FormExerciseComponent],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.scss'
})
export class CreateExerciseComponent {

}
