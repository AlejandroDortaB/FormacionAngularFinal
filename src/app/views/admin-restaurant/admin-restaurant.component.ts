import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantOptionBoxComponent } from "../../components/restaurant-option-box/restaurant-option-box.component";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserChatComponent } from "../../components/user-chat/user-chat.component";
import { ModalCreateRestaurantComponent } from '../../components/modal-create-restaurant/modal-create-restaurant.component';
import { Menu } from '../../interfaces/menu';
import { MatDialog } from '@angular/material/dialog';


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
  protected  restarantService= inject (RestaurantService);
  protected chatIsOpen:boolean=false;
  restaurants:Restaurant[]=[];

  constructor(public dialog: MatDialog){}

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

  openDialogCreateRestarant() {
    const dialogRef = this.dialog.open(ModalCreateRestaurantComponent);
    dialogRef.afterClosed().subscribe((data:any) => {
      if(data){ 
        const restaurant:Restaurant={
          name: data.name,
          capacity: data.capacity,
          description: data.description,
          enable: false
        }
        this.restarantService.createRestaurant(data).subscribe((newRestaurant:Restaurant)=>{
          console.log("newRestaurant",newRestaurant);
          //TODO colocar la imgen a elo restaurante creado
         
        });
        //Crear restarante 
        console.log("data",data)
      }
   
     });
    
  }
}
