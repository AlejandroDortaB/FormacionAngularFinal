import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let token = sessionStorage.getItem("token");
  if(token){
    req= req.clone({
        setHeaders:{
         
          'Accept':'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
  }
  return next(req);
};
