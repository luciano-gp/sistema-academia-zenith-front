import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

import { MatButtonModule } from "@angular/material/button";
import { IPlan } from "../../interfaces/IPlan";
import { PlanService } from "../../services/plan.service";

@Component({
  selector: "app-list-plan",
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: "./list-plan.component.html",
  styleUrl: "./list-plan.component.scss",
})
export class ListPlanComponent {
  private _planService = inject(PlanService);

  protected displayedColumns: string[] = [
    "titulo",
    "dt_inicio",
    "dt_fim",
    "valor_mensal",
    "modelo_contrato",
    "actions",
  ];
  protected dataSource: MatTableDataSource<IPlan> =
    new MatTableDataSource<IPlan>([]);

  async ngOnInit() {
    const plans = await this._planService.getAll();
    this.dataSource = new MatTableDataSource<IPlan>(plans);
  }

  delete(id: number) {
    this._planService.delete(id);
  }
}
