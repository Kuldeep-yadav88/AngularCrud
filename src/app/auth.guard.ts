import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router:Router,
    private authService:AuthServiceService
  ){}


  canActivate(): boolean {
    if(this.authService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  

}
