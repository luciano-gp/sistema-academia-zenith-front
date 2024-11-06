import { Injectable } from "@angular/core";
import { ChartConfiguration, ChartOptions } from "chart.js";

@Injectable({
  providedIn: "root",
})
export class DaysChartService {
  private attendanceData = [150, 130, 180, 170, 160, 100, 50];

  private average =
    this.attendanceData.reduce((a, b) => a + b) / this.attendanceData.length;

  barChartLabels = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  barChartData: ChartConfiguration["data"]["datasets"] = [
    {
      data: Array(7).fill(this.average),
      borderColor: "#FF000070",
      borderWidth: 2,
      type: "line",
      fill: false,
      pointStyle: false,
    },
    {
      data: this.attendanceData,
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
      borderWidth: 1,
      type: "bar",
    }
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Frequência",
        font: {
          size: 24,
          weight: 'bold'
        },
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.dataset.type === "line") {
              return `Média: ${context.raw.toFixed(0)} alunos`;
            }
            return `Frequência: ${context.raw} alunos`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Dia da Semana'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f020'
        },
        title: {
          display: true,
          text: 'Número de Alunos'
        },
        ticks: {
          stepSize: 50
        }
      }
    }
  };
}
