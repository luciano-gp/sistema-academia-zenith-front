import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IPlan } from '../../interfaces/IPlan';
import { PlanService } from '../../services/plan.service';
import { FormPlanComponent } from "../form-plan/form-plan.component";

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [FormPlanComponent],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.scss'
})
export class CreatePlanComponent {
  private _planService = inject(PlanService);
  private _snackbar = inject(MatSnackBar);
  private _router = inject(Router);

  async onSubmit(plan: IPlan) {
    try {
      await this._planService.create(plan);
      this._snackbar.open('Plano criado com sucesso', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/planos');
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao criar plano', 'Fechar', { duration: 5000 });
    }
  }
}
