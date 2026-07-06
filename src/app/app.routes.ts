import { Routes } from '@angular/router';
import { RecommendCarComponent } from './pages/recommend-car/recommend-car.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'recommend-car', component: RecommendCarComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
