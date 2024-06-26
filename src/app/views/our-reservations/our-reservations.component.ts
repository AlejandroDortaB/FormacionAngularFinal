import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { Reservation } from '../../interfaces/reservation';

@Component({
  selector: 'app-our-reservations',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './our-reservations.component.html',
  styleUrl: './our-reservations.component.css'
})
export class OurReservationsComponent implements OnInit {

  
  protected  userService= inject (UserService);
  reservations:Reservation[]=[];

  ngOnInit(): void {
    this.userService.getUserReservations().subscribe((result:Reservation[])=>{
      console.log("result",result)
      this.reservations = result;
    })
  }

  cancelReservation(reservationId: number,index:number) {
      this.userService.deleteUserReservation(reservationId).subscribe((result)=>{
        console.log("result",result)
        this.reservations.splice(index, 1);
        console.log("this.reservations",this.reservations)
      });
    }
}
