import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ReservationComponent } from './views/reservation/reservation.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"restaurantes",component:HomeComponent},
    {path:"restaurante/:id",component:ReservationComponent},
    {path: '', component: LoginComponent },
    {path: '**', component: LoginComponent },
];
