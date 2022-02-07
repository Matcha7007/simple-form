import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ){}
  canActivate(){
    if (this.auth.isLoggedIn()){
      return true;
    }
    this.alert.alertFailed("You have not signed in");
    this.router.navigate(['signin']);
    return false;
  }
}
