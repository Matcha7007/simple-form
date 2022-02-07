import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionEmployeeGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ){}
  canActivate(){
    let role = this.auth.getRole();
    if ( role === 'Administrator' || role === 'Employee')
      return true;
    else {
      this.router.navigate(['/main']);
      this.alert.alertFailed('You are not allowed access');
      return false;
    }
  }
}
