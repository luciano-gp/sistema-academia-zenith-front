import { Component } from '@angular/core';
import { FormExerciseComponent } from "../form-exercise/form-exercise.component";

@Component({
  selector: 'app-edit-exercise',
  standalone: true,
  imports: [FormExerciseComponent],
  templateUrl: './edit-exercise.component.html',
  styleUrl: './edit-exercise.component.scss'
})
export class EditExerciseComponent {

}
