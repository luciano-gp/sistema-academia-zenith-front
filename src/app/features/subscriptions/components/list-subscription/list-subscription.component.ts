import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { ISubscription } from "../../interfaces/ISubscription";
import { SubscriptionService } from "../../services/subscription.service";

@Component({
  selector: "app-list-subscription",
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: "./list-subscription.component.html",
  styleUrl: "./list-subscription.component.scss",
})
export class ListSubscriptionComponent {
  private _subscriptionService = inject(SubscriptionService);

  private subscriptions = signal<ISubscription[]>([]);

  protected displayedColumns: string[] = [
    "pessoa",
    "dt_contratacao",
    "dt_final",
    "plano",
    "actions",
  ];
  protected dataSource: MatTableDataSource<ISubscription> =
    new MatTableDataSource<ISubscription>(this.subscriptions());

  async ngOnInit() {
    const subscriptions = await this._subscriptionService.getAll();
    this.dataSource = new MatTableDataSource<ISubscription>(subscriptions);
  }

  delete(id: number) {
    this._subscriptionService.delete(id);
  }
}
