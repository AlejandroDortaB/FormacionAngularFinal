import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../interfaces/restaurant';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenuItemBoxComponent } from "../../components/menu-item-box/menu-item-box.component";
import { ModalCreateMenuComponent } from "../../components/modal-create-menu/modal-create-menu.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Menu } from '../../interfaces/menu';
import { FoodPlates } from '../../interfaces/food-plates';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
    selector: 'app-modify-restaurant',
    standalone: true,
    templateUrl: './modify-restaurant.component.html',
    styleUrl: './modify-restaurant.component.css',
    imports: [NavbarComponent,
        FormsModule,
        MatTabsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule, 
        MenuItemBoxComponent, 
        ModalCreateMenuComponent,
        MatDialogModule,MatSlideToggleModule]
})
export class ModifyRestaurantComponent implements OnInit{

  protected  restaurantService= inject (RestaurantService);
  currentRestaurant!: Restaurant;
  protected name:string="";
  protected description:string="";
  protected capacity:number=0;
  protected enbleRestaurant:boolean=true;

  protected reservations:any;

  imageUrl: string | ArrayBuffer | undefined | null = null;

  constructor(private route:ActivatedRoute,public dialog: MatDialog){}

  ngOnInit(): void {
    this.restaurantService.getRestaurantById(this.route.snapshot.params['id']).subscribe((restaurant:Restaurant)=>{
     this.currentRestaurant= restaurant;
     this.name= this.currentRestaurant.name;
     this.description = this.currentRestaurant.description;
     this.capacity= restaurant.capacity;
     this.imageUrl= this.currentRestaurant.imageUrl;
     this.enbleRestaurant= restaurant.enable
    })
      this.restaurantService.getRestaurantReservations(this.route.snapshot.params['id']).subscribe((result)=>{
        console.log("result",result)
        this.reservations = result;

      })
   }  

   onSubmit() {
    const restaurantModify:Restaurant={
      name:this.name,
      capacity: this.capacity,
      description: this.description,
      imgIndex:this.currentRestaurant.imgIndex,
      imageUrl: this.currentRestaurant.imageUrl,
      enable:true
    }
    this.restaurantService.modifyRestaurantData(this.currentRestaurant.id!, restaurantModify).subscribe((restaurant:Restaurant)=>{
      this.currentRestaurant.name= restaurant.name;
    })
    }

    openDialogCreateMenu() {
      const dialogRef = this.dialog.open(ModalCreateMenuComponent);
      dialogRef.afterClosed().subscribe((data:Menu) => {
       if((data.name !="")&&(data)){      
          this.restaurantService.createMenu({name:data.name,restaurant: this.currentRestaurant.id!}).subscribe((newMenu:Menu)=>{ 
            newMenu.foodPlates=[];         
            if(data.foodPlates.length > 0){
              for (let index = 0; index < data.foodPlates.length; index++) {
                data.foodPlates[index].menuId=newMenu.id
                this.restaurantService.createPlatesforMenu(data.foodPlates[index]).subscribe((food:FoodPlates)=>{
                  newMenu.foodPlates.push(food)
                })
              }
              this.currentRestaurant.menus!.push(newMenu);
            } 
          }) 
       }
      });
    }

    deleteMenu(idMenu:number) {
      this.currentRestaurant.menus!.forEach((menu:Menu, index: number)=>{
        if(menu.id==idMenu){
          this.restaurantService.deleteMenu(menu.id);
          this.currentRestaurant.menus!.splice(index, 1);
        }
      })
    }

    getReservationDates(): string[] {
      return Object.keys(this.reservations);
    }


    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.restaurantService.uploadRestaurantImage(this.currentRestaurant.id!,file).subscribe((result)=>{
        console.log("result")
      })
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
      }
    }
}
