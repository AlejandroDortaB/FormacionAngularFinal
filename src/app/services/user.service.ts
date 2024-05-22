import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Reservation } from '../interfaces/reservation';
import { User } from '../interfaces/user';
import { Conversation } from '../interfaces/conversation';
import { Restaurant } from '../interfaces/restaurant';

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
  getUserRestaurants():Observable<Restaurant[]>{
    const id:number=this.authService.getUserIdFromToken();
    return this.http.get<Restaurant[]>('http://localhost:8080/api/v1/user/'+ id+'/restaurant')
  }

  deleteUserReservation(reservatioId:number):Observable<Object>{
    return this.http.delete("http://localhost:8080/api/v1/reservation/"+reservatioId)
  }
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/api/v1/user')
  }

  changeUserRole(userId:number, roleId:number){
    this.http.put<User>('http://localhost:8080/api/v1/user/'+userId+"/role/"+roleId,null).subscribe((result:any)=>{
      console.log("result",result)
    })
  }

  getAllUserWithRoleId(roleId:number):Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/api/v1/role/'+roleId+'/users')
  }
}
