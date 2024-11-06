import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => (
            import ('./features/auth/components/login/login.component')
            .then(m => m.LoginComponent)
        )
    },
    {
        path: 'dashboard', 
        loadComponent: () => (
            import ('./features/dashboard/components/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
        ),
        canActivate: [AuthGuard]
    }
];
