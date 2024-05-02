import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ReservationComponent } from './views/reservation/reservation.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"home",component:HomeComponent},
    {path:"reservation",component:ReservationComponent},
    {path: '', component: ReservationComponent },
];
