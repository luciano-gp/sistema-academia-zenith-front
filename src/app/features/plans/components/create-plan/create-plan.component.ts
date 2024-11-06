import { Component } from '@angular/core';
import { IPlan } from '../../interfaces/IPlan';
import { FormPlanComponent } from "../form-plan/form-plan.component";

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [FormPlanComponent],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.scss'
})
export class CreatePlanComponent {
  onSubmit(plan: IPlan): void {
    console.log(plan);
  }
}
