import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";

import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

import { MatButtonModule } from "@angular/material/button";
import { CpfPipe } from "../../../../core/pipes/cpf.pipe";
import { PhonePipe } from "../../../../core/pipes/phone.pipe";
import { IPerson } from "../../interfaces/IPerson";
import { PersonService } from "../../services/person.service";

@Component({
  selector: "app-list-person",
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    CpfPipe,
    PhonePipe
  ],
  templateUrl: "./list-person.component.html",
  styleUrls: ["./list-person.component.scss"],
})
export class ListPersonComponent {
  private _personService = inject(PersonService);

  protected displayedColumns: string[] = [
    "nome",
    "dt_nascimento",
    "cpf",
    "telefone",
    "genero",
    "cidade",
    "actions",
  ];
  protected dataSource: MatTableDataSource<IPerson> =
    new MatTableDataSource<IPerson>([]);

  async ngOnInit() {
    const persons = await this._personService.getAll();
    this.dataSource = new MatTableDataSource<IPerson>(persons);
  }

  delete(id: number) {
    this._personService.delete(id);
  }
}
