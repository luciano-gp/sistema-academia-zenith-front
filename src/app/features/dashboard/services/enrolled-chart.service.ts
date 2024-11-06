import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class EnrolledChartService {
  
    lineChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    lineChartData: ChartConfiguration['data']['datasets'] = [
      {
        data: [250, 268, 290, 280, 262, 249, 233, 268, 287, 302, 318, 301],
        label: 'Matriculados',
        backgroundColor: '#007bff',
        borderColor: '#007bff'
      },
      {
        data: [180, 200, 230, 230, 222, 224, 219, 231, 256, 280, 288, 263],
        label: 'Ativos',
        backgroundColor: '#28a745',
        borderColor: '#28a745'
      },
      {
        data: [20, 18, 23, 20, 25, 19, 17, 18, 20, 22, 27, 28],
        label: 'Inadimplentes',
        backgroundColor: '#dc3545',
        borderColor: '#dc3545'
      }
    ];
  
    lineChartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          font: {
            size: 24,
            weight: 'bold'
          },
          text: 'Membros'
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          grid: {
            color: '#f0f0f020'
          }
        },
        y: {
          grid: {
            color: '#f0f0f020'
          },
        }
      }
    };
}
