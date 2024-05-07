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
        MatDialogModule]
})
export class ModifyRestaurantComponent implements OnInit{

  numbers: any[] = [
    {value: 0, viewValue: 'Imagen 1'},
    {value: 1, viewValue: 'Imagen 2'},
    {value: 2, viewValue: 'Imagen 3'},
    {value: 3, viewValue: 'Imagen 4'},
  ];

  protected  restaurantService= inject (RestaurantService);
  currentRestaurant!: Restaurant;
  protected name:string="";
  protected description:string="";
  protected capacity:number=0;

  constructor(private route:ActivatedRoute,public dialog: MatDialog){}

  ngOnInit(): void {
    this.restaurantService.getRestaurantById(this.route.snapshot.params['id']).subscribe((restaurant)=>{
     this.currentRestaurant= restaurant;
     console.log(this.currentRestaurant)
     this.name= this.currentRestaurant.name;
     this.description = this.currentRestaurant.description;
    })
    
   }

   onSubmit() {
    throw new Error('Method not implemented.');
    }

    openDialogCreateMenu() {
      const dialogRef = this.dialog.open(ModalCreateMenuComponent);
      let newMenuName:string=""

      dialogRef.afterClosed().subscribe(name => {
       newMenuName = name
       if((newMenuName !="")&&(newMenuName)){
        
        this.restaurantService.createMenu({name:newMenuName,restaurant: this.currentRestaurant.id}).subscribe((newMenu:Menu)=>{
          this.currentRestaurant.menus.push(newMenu);
        })
       }
      });
    }
}
