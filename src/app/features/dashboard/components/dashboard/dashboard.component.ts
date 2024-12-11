import { NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { IClassOccurrence } from '../../../classes/interfaces/IClassOccurrence';
import { PersonService } from '../../../persons/services/person.service';
import { ScheduleService } from '../../../schedules/services/schedule.service';
import { ITraining } from '../../../trainings/interfaces/ITraining';
import { ClassesChartService } from '../../services/classes-chart.service';
import { DaysChartService } from '../../services/days-chart.service';
import { DefaultersChartService } from '../../services/defaulters-chart.service';
import { EnrolledChartService } from '../../services/enrolled-chart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, MatCardModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private _personService = inject(PersonService);
  private _enrolledChartService = inject(EnrolledChartService);
  private _defaultersChartService = inject(DefaultersChartService);
  private _classesChartService = inject(ClassesChartService);
  private _daysChartService = inject(DaysChartService);
  private _scheduleService = inject(ScheduleService);

  protected enrolledChartData = this._enrolledChartService.lineChartData;
  protected enrolledChartLabels = this._enrolledChartService.lineChartLabels;
  protected enrolledChartOptions = this._enrolledChartService.lineChartOptions;

  protected defaultersChartData = this._defaultersChartService.doughnutChartData;
  protected defaultersChartOptions = this._defaultersChartService.doughnutChartOptions;
  protected defaultersChartLabels = this._defaultersChartService.doughnutChartLabels;
  
  protected classesChartData = this._classesChartService.doughnutChartData;
  protected classesChartOptions = this._classesChartService.doughnutChartOptions;
  protected classesChartLabels = this._classesChartService.doughnutChartLabels;
  
  protected daysChartData = this._daysChartService.barChartData;
  protected daysChartOptions = this._daysChartService.barChartOptions;
  protected daysChartLabels = this._daysChartService.barChartLabels;

  protected person = computed(() => this._personService.getPerson);

  diasDaSemana = [
    { value: 'Segunda-feira', label: 'Segunda-feira' },
    { value: 'Terça-feira', label: 'Terça-feira' },
    { value: 'Quarta-feira', label: 'Quarta-feira' },
    { value: 'Quinta-feira', label: 'Quinta-feira' },
    { value: 'Sexta-feira', label: 'Sexta-feira' },
    { value: 'Sábado', label: 'Sábado' },
    { value: 'Domingo', label: 'Domingo' },
  ];

  agenda: { [key: string]: IClassOccurrence[] } = {};
  meusTreinos: ITraining[] = [];

  protected title = computed(() => `Olá, ${(this.person()?.nome?.split(' ')[0] || '') + ','} seja bem-vind${this.person().genero === 'Feminino' ? 'a' : 'o'}!`);

  async ngOnInit() {
    const ocorrencias = await this._scheduleService.getAll();

    this.diasDaSemana.forEach((dia) => {
      this.agenda[dia.value] = ocorrencias.filter(
        (ocorrencia) => ocorrencia.dia_semana === dia.value
      );
    });
      console.log("🚀 ~ DashboardComponent ~ this.diasDaSemana.forEach ~ agenda:", this.agenda)
  }
}
