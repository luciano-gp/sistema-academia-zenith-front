import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class DefaultersChartService {
  doughnutChartLabels = ['Matriculados', 'Inadimplentes'];

  doughnutChartData: ChartConfiguration['data']['datasets'] = [
    {
      data: [301, 28],
      backgroundColor: ['#4BC0C0', '#FF6384'],
      hoverBackgroundColor: ['#36A7A7', '#FF4F71'],
      hoverOffset: 10
    }
  ]

  doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    borderColor: 'transparent',
    plugins: {
      title: {
        display: true,
        font: {
          size: 24,
          weight: 'bold'
        },
        text: 'Inadimplência'
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} alunos (${percentage}%)`;
          }
        }
      }
    },
  };
}
