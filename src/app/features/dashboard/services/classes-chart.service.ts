import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ClassesChartService {
  doughnutChartLabels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  doughnutChartData: ChartConfiguration['data']['datasets'] = [
    {
      data: [2, 3, 3, 4, 2, 3, 1],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#50B2C0',
        '#FFCE56',
        '#9966FF',
        '#FF9F40',
        '#2EC4B6'
      ],
      hoverBackgroundColor: [
        '#FF4F71',
        '#2C8AD8',
        '#3E8F9A',
        '#FFB93F',
        '#8345FF',
        '#FF8B27',
        '#25A093'
      ],
      hoverOffset: 10
    }
  ]

  doughnutChartOptions: ChartOptions = {
    responsive: true,
    borderColor: 'transparent',
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        font: {
          size: 24,
          weight: 'bold'
        },
        text: 'Aulas'
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} aulas`;
          }
        }
      }
    },
  };
}
