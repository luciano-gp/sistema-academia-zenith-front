import { Component, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from '../../interfaces/ISubscription';
import { SubscriptionService } from '../../services/subscription.service';
import { FormSubscriptionComponent } from '../form-subscription/form-subscription.component';

@Component({
  selector: 'app-edit-subscription',
  standalone: true,
  imports: [FormSubscriptionComponent],
  templateUrl: './edit-subscription.component.html',
  styleUrl: './edit-subscription.component.scss'
})
export class EditSubscriptionComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _subscriptionService = inject(SubscriptionService);
  private _snackbar = inject(MatSnackBar);

  protected subscription = signal<ISubscription>({} as ISubscription);

  async ngOnInit() {
    const { id } = this._route.snapshot.params;

    const subscription = await this._subscriptionService.getById(id);
    this.subscription.set(subscription);
  }

  onDelete() {
    if (this.subscription()?.id) {
      this._subscriptionService.delete(this.subscription().id!);
      this._router.navigateByUrl('/assinaturas');
    }
  }

  async onSubmit(subscription: ISubscription) {
    console.log("🚀 ~ EditSubscriptionComponent ~ onSubmit ~ subscription:", subscription)
    try {
      await this._subscriptionService.edit(subscription);
      this._snackbar.open('Pessoa editada com sucesso', 'Fechar', { duration: 5000 });
      this._router.navigateByUrl('/assinaturas');
    } catch (err) {
      console.error(err);
      this._snackbar.open('Erro ao editar pessoa', 'Fechar', { duration: 5000 });
    }
  }
}
