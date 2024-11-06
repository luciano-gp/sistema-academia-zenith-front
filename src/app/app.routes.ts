import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/auth/components/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import(
        "./features/dashboard/components/dashboard/dashboard.component"
      ).then((m) => m.DashboardComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "planos",
    loadComponent: () =>
      import("./features/plans/components/list-plan/list-plan.component").then(
        (m) => m.ListPlanComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "planos/editar/:id",
    loadComponent: () =>
      import("./features/plans/components/edit-plan/edit-plan.component").then(
        (m) => m.EditPlanComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "planos/novo",
    loadComponent: () =>
      import(
        "./features/plans/components/create-plan/create-plan.component"
      ).then((m) => m.CreatePlanComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "pessoas",
    loadComponent: () =>
      import(
        "./features/persons/components/list-person/list-person.component"
      ).then((m) => m.ListPersonComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "aulas",
    loadComponent: () =>
      import(
        "./features/classes/components/list-class/list-class.component"
      ).then((m) => m.ListClassComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "agendamentos",
    loadComponent: () =>
      import(
        "./features/schedules/components/list-schedule/list-schedule.component"
      ).then((m) => m.ListScheduleComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "exercicios",
    loadComponent: () =>
      import(
        "./features/exercises/components/list-exercise/list-exercise.component"
      ).then((m) => m.ListExerciseComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "treinos",
    loadComponent: () =>
      import(
        "./features/trainings/components/list-training/list-training.component"
      ).then((m) => m.ListTrainingComponent),
    canActivate: [AuthGuard],
  },
];
