import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RestaurantService } from '../../services/restaurant.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { Restaurant } from '../../interfaces/restaurant';


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
    DatePipe
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
  protected dateSelected!: string;
  protected timeSelected:string="";
  protected nPersons: number=1;
  times: [string, string][]=[["8:00 AM","8:00:00"],["9:00 AM","9:00:00"], ["10:00 AM","10:00:00"], ["11:00 AM","11:00:00"], ["12:00 AM","12:00:00"],["1:00 PM","13:00:00"],
   ["2:00 PM","14:00:00"],["3:00 PM","15:00:00"],["4:00 PM","16:00:00"],["5:00 PM","17:00:00"],["6:00 PM","18:00:00"],["7:00 PM","19:00:00"],
   ["8:00 PM","20:00:00"],["9:00 PM","21:00:00"]];
  protected  restaurantService= inject (RestaurantService);
  currentRestaurant!: Restaurant;
  constructor(private route:ActivatedRoute,private datePipe: DatePipe){}

  ngOnInit(): void {
   this.restaurantService.getRestaurantById(this.route.snapshot.params['id']).subscribe((restaurant)=>{
    this.currentRestaurant= restaurant;
    console.log(this.currentRestaurant)
   })
   
  }
  selectTime(time:[string, string]) {
    this.timeSelected=time[1];
    }

  sendReservation() {
    this.restaurantService.generateReservation(this.nPersons,this.dateSelected,this.timeSelected,this.currentRestaurant.id);
    }

    addEvent(event: MatDatepickerInputEvent<Date>) {
      this.dateSelected=this.datePipe.transform(event.value, 'yyyy-MM-dd')!
    }
}
