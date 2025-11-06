import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './featured/auth/auth-module';
import { Login } from './featured/auth/login/login';
import { Dashboard } from './featured/dashboard/dashboard';
import { authGuard } from './core/guards/auth/auth-guard';
import { loginGuard } from './core/guards/login/login-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./featured/dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
