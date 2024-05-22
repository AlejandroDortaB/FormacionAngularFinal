import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal-create-restaurant',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule],
  templateUrl: './modal-create-restaurant.component.html',
  styleUrl: './modal-create-restaurant.component.css'
})
export class ModalCreateRestaurantComponent {
  protected  authService= inject (AuthService);
  name: string="";
  description: string="";
  capacity: number=0;
  file!: File;
  imageUrl: string | ArrayBuffer | undefined | null = null;

  getDataNewRestaurant(): any {
   const body:any={
      name: this.name,
      capacity: this.capacity,
      description: this.description,
      userId: this.authService.getUserIdFromToken(),
      enable: 0,
      file: this.file
    } 
    return body;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

 

}
