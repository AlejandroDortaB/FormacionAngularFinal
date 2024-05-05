import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

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

 
}
