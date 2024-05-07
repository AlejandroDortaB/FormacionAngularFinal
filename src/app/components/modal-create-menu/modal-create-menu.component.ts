import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-create-menu',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule],
  templateUrl: './modal-create-menu.component.html',
  styleUrl: './modal-create-menu.component.css'
})
export class ModalCreateMenuComponent {
  protected name:string="";

  createMenu(){
    
  }

}
