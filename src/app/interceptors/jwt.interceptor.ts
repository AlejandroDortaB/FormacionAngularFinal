import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let token = sessionStorage.getItem("token");
  if(token){
    req= req.clone({
        setHeaders:{
          'Content-Type':'application/json;charset=utf-8',
          'Accept':'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
  }
  return next(req);
};
