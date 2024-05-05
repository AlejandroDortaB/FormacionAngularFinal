import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RestaurantService } from '../../services/restaurant.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule,
            RouterModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule,
            MatSelectModule,
            NavbarComponent,
            ],
  providers: [  
    provideNativeDateAdapter(),  
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
 
  protected nPersons: string="";
  times:string[]=["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", 
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]
  protected  restaurantService= inject (RestaurantService);
  currentRestaurant:any;
  
  constructor(private route:ActivatedRoute){

  }

  ngOnInit(): void {
   this.restaurantService.getRestaurantById(this.route.snapshot.params['id']).subscribe((restaurant)=>{
    this.currentRestaurant= restaurant;
    console.log(this.currentRestaurant)
   })
   
  }
  

  sendReservation() {
    throw new Error('Method not implemented.');
    }
}
