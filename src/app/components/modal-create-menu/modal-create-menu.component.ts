import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FoodPlates } from '../../interfaces/food-plates';
import { Menu } from '../../interfaces/menu';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-modal-create-menu',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule],
  templateUrl: './modal-create-menu.component.html',
  styleUrl: './modal-create-menu.component.css'
})
export class ModalCreateMenuComponent implements OnInit{

  constructor( @Inject(MAT_DIALOG_DATA) public data: Menu,){}
  protected  restaurantService= inject (RestaurantService);
  
  protected menuId:number | undefined;
  protected activeFormPlate:boolean=false;
  protected name:string="";
  protected platesMenu:FoodPlates[]=[];

  protected plateName:string=""
  protected plateIngredients:string=""
  protected platePrice:number=10;


  ngOnInit(): void {
   if(this.data){//Editar un menu
    this.name = this.data.name;
    this.platesMenu=this.data.foodPlates.slice();//el slice es para hacer una copia del this.data.foodPlates
    this.menuId = this.data.id;
   }
  }
  openFormPlate() {
   this.activeFormPlate=true;
  }

  addPlate() {
     let newPlate:FoodPlates={
      name:this.plateName,
      ingredients:this.plateIngredients,
      prices:this.platePrice,
      menuId:this.menuId
     };
     this.platesMenu.push(newPlate);
     this.plateName="";
     this.plateIngredients="";
     this.platePrice=10;
     this.activeFormPlate=false;
  }

  cancelnewPlate() {
    this.activeFormPlate=false;
  }
  deletePlates(index:number) {
    if(this.platesMenu[index].id){
      this.restaurantService.deleteFoodPlates(this.platesMenu[index].id!);
    }
    this.data.foodPlates.splice(index, 1);
    this.platesMenu.splice(index, 1);
  }
  getDataNewMenu():Menu{
    const body:Menu={
      id:this.menuId,
      name:this.name,
      foodPlates: this.platesMenu,
    }
    return body;
  }

}
