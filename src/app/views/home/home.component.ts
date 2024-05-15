import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RestaurantOptionBoxComponent } from "../../components/restaurant-option-box/restaurant-option-box.component";
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';
import { UserChatComponent } from '../../components/user-chat/user-chat.component';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RestaurantOptionBoxComponent,NavbarComponent, UserChatComponent]
})
export class HomeComponent implements OnInit{
    protected  authService= inject (AuthService); 
    private  restaurantService= inject (RestaurantService); 
    protected chatIsOpen:boolean=false;
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

    
    openChat(){
        this.chatIsOpen=true
      }
  
      closeChat() {
        this.chatIsOpen=false
      }
}
