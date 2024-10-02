import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => (
            import ('./features/auth/components/login/login.component')
            .then(m => m.LoginComponent)
        )
    },
];
