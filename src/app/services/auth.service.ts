import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { GeneralResponse } from '../interfaces/general-response';
import { jwtDecode } from "jwt-decode";
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  messageService= inject (MessageService);
  constructor(private http: HttpClient,private router: Router ) {}

  login(username:string,password:string){
    this.http.post<LoginResponse>('http://localhost:8080/api/v1/auth/login',{username:username,password:password}).pipe(
      tap((result:LoginResponse)=>{
        console.log(result);
        sessionStorage.setItem("token",result.token)
        this.router.navigateByUrl('restaurantes');
      })
    ).subscribe({
      next:()=>{},
      error:(error)=>{
        alert(`ERROR: ${error.error.error}`);
        console.log(error);
      },

    });
  }
  register(username:string,password:string){
    this.http.post<GeneralResponse>('http://localhost:8080/api/v1/auth/register',{username:username,password:password}).subscribe({
      next:(result:GeneralResponse)=>{
        console.log("result",result)
        this.messageService.generateMessage("Se a registrado el usuario")
      },
      error:(error)=>{
        alert(`ERROR: ${error.error.error}`);
        console.log(error);
      }
    })
  }
  logout(){
    sessionStorage.removeItem("token");
    this.router.navigateByUrl('login');
  }

  retrictedPetition():Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>('http://localhost:8080/api/v1/demo',{})
  }
  
  getUserIdFromToken(){
    const decodedToken:any = jwtDecode(sessionStorage.getItem("token")!);
    return decodedToken.id;
  }
}
