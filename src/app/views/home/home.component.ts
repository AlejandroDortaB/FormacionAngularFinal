import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RestaurantOptionBoxComponent } from "../../components/restaurant-option-box/restaurant-option-box.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RestaurantOptionBoxComponent]
})
export class HomeComponent {

}
