import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Menu } from '../../interfaces/menu';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateMenuComponent } from '../modal-create-menu/modal-create-menu.component';
import { RestaurantService } from '../../services/restaurant.service';
import { FoodPlates } from '../../interfaces/food-plates';

@Component({
  selector: 'app-menu-item-box',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-box.component.html',
  styleUrl: './menu-item-box.component.css'
})
export class MenuItemBoxComponent {
  @Input() data!: Menu;
  @Input() admin: boolean=false;
  @Output() deleteMenuEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog){}
  protected  restaurantService= inject (RestaurantService);
    openDialogMenu() {
      const dialogRef = this.dialog.open(ModalCreateMenuComponent,{data:this.data});
      dialogRef.afterClosed().subscribe((data:Menu) => {
        console.log("data",data);
        if(data){
          this.restaurantService.updateMenuData(data.id!,{name:data.name}).subscribe(()=>{
            this.data.name=data.name;
          });
          if(data.foodPlates.length > 0){
            data.foodPlates.forEach((foodPlate:FoodPlates)=>{
              if(!foodPlate.id){
                this.restaurantService.createPlatesforMenu(foodPlate).subscribe((food:FoodPlates)=>{
                  this.data.foodPlates.push(food)
                })
               
              }
            })
          }
        }
      });
    }

    deleteMenu(){
      this.deleteMenuEvent.emit(this.data.id);
    }
}
