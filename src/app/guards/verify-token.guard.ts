import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const verifyTokenGuard: CanActivateFn = (route, state) => {
  const router =inject(Router)
  let token = sessionStorage.getItem("token");
  console.log("token",token);
  if(token){
    try {    
      let decodeToken=jwtDecode(token);
      if(decodeToken.exp! > new Date().getTime()){
        router.navigateByUrl('login');
        return false
      }
    }
    catch (error) {
      console.log("error",error)
      router.navigateByUrl('login');
      return false;
    }
    return true;
   
  }
  router.navigateByUrl('login');
  console.log("retunr false")
  return false;
};
