import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Time } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { MessageService } from './message.service';
import { Menu } from '../interfaces/menu';
import { FoodPlates } from '../interfaces/food-plates';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 
  private  authService= inject (AuthService);
  private  messageService= inject (MessageService);

  imagenesRestaurantes:string[]=["./assets/res3.jpg",
    "./assets/res1.jpg","./assets/res2.webp","./assets/res4.webp"];

  currentrestaurant!: Restaurant;

  constructor(private http: HttpClient) {
   }

   createRestaurant(ownerId:number){
    const body:any={
        name: "Nuevo Restaurante",
        capacity: 50,
        description: "",
        userId: ownerId,
        enable: 0
    }
    return this.http.post<Restaurant>('http://localhost:8080/api/v1/restaurant', body).subscribe((newRestaurant:Restaurant)=>{
      console.log("newRestaurant",newRestaurant)
      this.messageService.generateMessage("Restaurante creado con exito");
    });
   }

  getImgRestaurent(index:number):string{
    return this.imagenesRestaurantes[index%4];
  }

  getAllRestaurant():Observable<Restaurant[]>{
   return this.http.get<Restaurant[]>('http://localhost:8080/api/v1/restaurant')
  }

  getRestaurantById(id:number):Observable<Restaurant>{
    return this.http.get<Restaurant>('http://localhost:8080/api/v1/restaurant/'+id)
   }

   modifyRestaurantData(idRestaurant:number,body:Restaurant):Observable<Restaurant> {
    return this.http.put<Restaurant>('http://localhost:8080/api/v1/restaurant/'+idRestaurant,body)
  }

  uploadRestaurantImage(restaurantId: number, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile, imageFile.name);
    return this.http.post('http://localhost:8080/api/v1/restaurant/' + restaurantId + '/upload-image', formData);
}
  

   /*********************************************************Reservation************************ */

   generateReservation(nPersons:number,date:string,time:string,restaurantId:number){
    const userId=this.authService.getUserIdFromToken();
    const body={
      "date": date,//"2024-05-10"
      "time": time,//"19:00:00"
      "numberPeople": nPersons,
      "restaurant": restaurantId,
      "user":userId
    }
    this.http.post('http://localhost:8080/api/v1/reservation',body).subscribe((result)=>{
      this.messageService.generateMessage("Reserva realizada con exito")
    })
   }

   getRestaurantReservations(idRestaurant:number):Observable<any>{
    return this.http.get("http://localhost:8080/api/v1/restaurant/"+idRestaurant+"/reservation")
   }

   getReservationGroupByDate(idRestaurant:number):Observable<any>{
    return this.http.get("http://localhost:8080/api/v1/restaurant/"+idRestaurant+"/reservation/group-date")
   }

   /**********************************************************Menus********************************************/
   createMenu(body: { name: string; restaurant: number; }):Observable<Menu> {
    return this.http.post<Menu>("http://localhost:8080/api/v1/menu",body)

  }
  updateMenuData(idMenu:number,body: { name: string }) :Observable<Menu>{
   return this.http.put<Menu>("http://localhost:8080/api/v1/menu/"+idMenu,body)
  }

  deleteMenu(idMenu:number){
    this.http.delete("http://localhost:8080/api/v1/menu/"+idMenu).subscribe(()=>{   
    });
  }

  /************************************************************FoodPlates*********************************** */
  createPlatesforMenu(body: FoodPlates):Observable<FoodPlates> {
    return this.http.post<FoodPlates>("http://localhost:8080/api/v1/foodplate",body)
  }

  deleteFoodPlates(idFoodPlate:number){
    this.http.delete("http://localhost:8080/api/v1/foodplate/"+idFoodPlate).subscribe(()=>{   
    });
  }  
 
}
