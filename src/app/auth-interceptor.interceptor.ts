import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>,
     next: HttpHandler): 
     Observable<HttpEvent<any>> {
      const tokenString = localStorage.getItem('token');
      const token = tokenString ? JSON.parse(tokenString):null;

      const authRequest = request.clone({
        setHeaders: {
          Authorization : `Bearer $ (token)`,

        },

      })
    return next.handle(authRequest);
  }
}
