import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantOptionBoxComponent } from "../../components/restaurant-option-box/restaurant-option-box.component";

@Component({
    selector: 'app-admin-user',
    standalone: true,
    templateUrl: './admin-user.component.html',
    styleUrl: './admin-user.component.css',
    imports: [NavbarComponent, MatSelectModule, MatTabsModule, RestaurantOptionBoxComponent]
})
export class AdminUserComponent implements OnInit{
  private  userService= inject (UserService); 
  private  restaurantService= inject (RestaurantService);   
  restaurants:Restaurant[]=[];
  users:User[]=[];
  owner:User[]=[];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users:User[])=>{
      this.users=users;
      console.log(this.users);
    })
    this.restaurantService.getAllRestaurant().subscribe({
      next:(result:Restaurant[])=>{
       this.restaurants = result;
       console.log(this.restaurants)
      },
      error:(error)=>{
       
      }
    }) 
  }

  changeUserRole(user:User,roleId:number){
    this.userService.changeUserRole(user.id!,roleId);
    user.role.id=roleId;
  }
  




}
