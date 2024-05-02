import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected username: string="";
  protected password: string="";
  private  authService= inject (AuthService);

  login() {
    console.log("Login:: ",this.username,"  ",this.password);
    this.authService.login(this.username,this.password);
  }
}
