import { Component, Input } from '@angular/core';
import { Menu } from '../../interfaces/menu';

@Component({
  selector: 'app-menu-item-box',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-box.component.html',
  styleUrl: './menu-item-box.component.css'
})
export class MenuItemBoxComponent {
  @Input() data!: Menu;
}
