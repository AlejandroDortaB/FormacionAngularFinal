import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantOptionBoxComponent } from "../../components/restaurant-option-box/restaurant-option-box.component";


@Component({
    selector: 'app-admin-restaurant',
    standalone: true,
    templateUrl: './admin-restaurant.component.html',
    styleUrl: './admin-restaurant.component.css',
    imports: [NavbarComponent, RestaurantOptionBoxComponent]
})
export class AdminRestaurantComponent implements OnInit{
  private  restaurantService= inject (RestaurantService); 

  restaurants:Restaurant[]=[];

  ngOnInit(): void {
    this.restaurantService.getAllRestaurant().subscribe({
       next:(result:Restaurant[])=>{
        this.restaurants = result;
        console.log(this.restaurants)
       },
       error:(error)=>{
        
       }
     })
   
  }
}
