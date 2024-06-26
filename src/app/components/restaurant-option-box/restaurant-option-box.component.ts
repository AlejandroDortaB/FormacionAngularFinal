import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-restaurant-option-box',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './restaurant-option-box.component.html',
  styleUrl: './restaurant-option-box.component.css'
})
export class RestaurantOptionBoxComponent {
  @Input() restaurant!: Restaurant;
  @Input() admin: boolean=false;
  
  protected  restaurantService= inject (RestaurantService); 
 

}
