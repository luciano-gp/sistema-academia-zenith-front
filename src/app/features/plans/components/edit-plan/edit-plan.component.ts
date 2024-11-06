import { Component, inject, signal } from '@angular/core';
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

  onSubmit(plan: IPlan): void {
    console.log(plan);
  }
}
