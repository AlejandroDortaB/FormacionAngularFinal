import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
   authService= inject (AuthService);

  getUserReservations():Observable<any>{
    const id:number=this.authService.getUserIdFromToken();
    return this.http.get('http://localhost:8080/api/v1/user/'+ id+'/reservations')
  }

  deleteUserReservation(reservatioId:number):Observable<any>{
    return this.http.delete("http://localhost:8080/api/v1/reservation/"+reservatioId)
  }

}
