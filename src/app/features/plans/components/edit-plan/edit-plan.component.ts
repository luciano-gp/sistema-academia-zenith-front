import { Component, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlan } from '../../interfaces/IPlan';
import { PlanService } from '../../services/plan.service';
import { FormPlanComponent } from '../form-plan/form-plan.component';

@Component({
  selector: 'app-edit-plan',
  standalone: true,
  imports: [FormPlanComponent],
  templateUrl: './edit-plan.component.html',
  styleUrl: './edit-plan.component.scss'
})
export class EditPlanComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _planService = inject(PlanService);
  private _snackbar = inject(MatSnackBar);

  protected plan = signal<IPlan>({} as IPlan);

  async ngOnInit() {
    const { id } = this._route.snapshot.params;

    const plan = await this._planService.getById(id);
    this.plan.set(plan);
  }

  onDelete() {
    if (this.plan()?.id) {
      this._planService.delete(this.plan().id!);
      this._router.navigateByUrl('/plans');
    }
  }

  async onSubmit(plan: IPlan) {
    try {
      await this._planService.edit(plan);
      this._snackbar.open('Plano editado com sucesso', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/planos');
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao editar plano', 'Fechar', { duration: 5000 });
    }
  }
}
