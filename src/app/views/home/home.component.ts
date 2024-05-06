import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RestaurantOptionBoxComponent } from "../../components/restaurant-option-box/restaurant-option-box.component";
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RestaurantOptionBoxComponent,NavbarComponent,]
})
export class HomeComponent implements OnInit{
    
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
