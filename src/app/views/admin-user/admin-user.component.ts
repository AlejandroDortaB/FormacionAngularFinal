import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {MatSelectModule} from '@angular/material/select';
import { Role } from '../../interfaces/role';

@Component({
    selector: 'app-admin-user',
    standalone: true,
    templateUrl: './admin-user.component.html',
    styleUrl: './admin-user.component.css',
    imports: [NavbarComponent, MatSelectModule]
})
export class AdminUserComponent implements OnInit{
  private  userService= inject (UserService); 
  users:User[]=[];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users:User[])=>{
      this.users=users;
      console.log(this.users);
    })
  }

  changeUserRole(userId:number,roleId:number){
    this.userService.changeUserRole(userId,roleId);
  }




}
