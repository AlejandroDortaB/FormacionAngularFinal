import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { OurReservationsComponent } from './views/our-reservations/our-reservations.component';
import { verifyTokenGuard } from './guards/verify-token.guard';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"restaurantes",component:HomeComponent, canActivate:[verifyTokenGuard]},
    {path:"restaurante/:id",component:ReservationComponent, canActivate:[verifyTokenGuard]},
    {path:"mis-reservas",component:OurReservationsComponent, canActivate:[verifyTokenGuard]},
    {path: '', component: LoginComponent },
    {path: '**', component: LoginComponent },
];
