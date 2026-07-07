import { Routes } from '@angular/router';
import { RecommendCarComponent } from './pages/recommend-car/recommend-car.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'add-car',
    component: AddCarComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'recommend-car',
    component: RecommendCarComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
