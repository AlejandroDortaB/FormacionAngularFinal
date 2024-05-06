import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
   authService= inject (AuthService);

  getUserReservations():Observable<Reservation[]>{
    const id:number=this.authService.getUserIdFromToken();
    return this.http.get<Reservation[]>('http://localhost:8080/api/v1/user/'+ id+'/reservations')
  }

  deleteUserReservation(reservatioId:number):Observable<Object>{
    return this.http.delete("http://localhost:8080/api/v1/reservation/"+reservatioId)
  }

}
