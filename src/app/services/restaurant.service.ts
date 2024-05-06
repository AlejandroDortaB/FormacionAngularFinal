import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private  authService= inject (AuthService);

  imagenesRestaurantes:string[]=["./assets/res3.jpg",
    "./assets/res1.jpg","./assets/res2.webp","./assets/res4.webp"];

  currentrestaurant:any;


  constructor(private http: HttpClient) {
   }


  getImgRestaurent(index:number):string{
    return this.imagenesRestaurantes[index%4];
  }

  getAllRestaurant():Observable<Object>{
   return this.http.get('http://localhost:8080/api/v1/restaurant')
  }

  getRestaurantById(id:number):Observable<Object>{
    return this.http.get('http://localhost:8080/api/v1/restaurant/'+id)
   }

   generateReservation(nPersons:number,date:string,time:string,restaurantId:number){
    const userId=this.authService.getUserIdFromToken();
    const body={
      "date": date,//"2024-05-10"
      "time": time,//"19:00:00"
      "numberPeople": nPersons,
      "restaurant": restaurantId,
      "user":userId
    }
    console.log(body);
    this.http.post('http://localhost:8080/api/v1/reservation',body).subscribe((result)=>{
      console.log("result",result)
    })
   }
 
}
