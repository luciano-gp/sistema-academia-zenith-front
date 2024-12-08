import { Component, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ISubscription } from "../../interfaces/ISubscription";
import { SubscriptionService } from "../../services/subscription.service";
import { FormSubscriptionComponent } from "../form-subscription/form-subscription.component";

@Component({
  selector: "app-create-subscription",
  standalone: true,
  imports: [FormSubscriptionComponent],
  templateUrl: "./create-subscription.component.html",
  styleUrl: "./create-subscription.component.scss",
})
export class CreateSubscriptionComponent {
  private _subscriptionService = inject(SubscriptionService);
  private _snackbar = inject(MatSnackBar);
  private _router = inject(Router);

  async onSubmit(subscription: ISubscription) {
    try {
      await this._subscriptionService.create(subscription);
      this._snackbar.open("Assinatura efetuada com sucesso", "Fechar", {
        duration: 5000,
      });
      this._router.navigateByUrl("/assinaturas");
    } catch (err) {
      console.error(err);
      this._snackbar.open("Erro ao efetuar assinatura", "Fechar", {
        duration: 5000,
      });
    }
  }
}
