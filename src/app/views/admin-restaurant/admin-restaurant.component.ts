import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantOptionBoxComponent } from "../../components/restaurant-option-box/restaurant-option-box.component";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserChatComponent } from "../../components/user-chat/user-chat.component";


@Component({
    selector: 'app-admin-restaurant',
    standalone: true,
    templateUrl: './admin-restaurant.component.html',
    styleUrl: './admin-restaurant.component.css',
    imports: [NavbarComponent, RestaurantOptionBoxComponent, UserChatComponent]
})
export class AdminRestaurantComponent implements OnInit{
  private  userService= inject (UserService); 
  protected  authService= inject (AuthService);
  protected chatIsOpen:boolean=false;
  restaurants:Restaurant[]=[];

  ngOnInit(): void {
    this.userService.getUserRestaurants().subscribe({
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
