
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForSignin, UserForSignup } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getRole() {
    var id = localStorage.getItem('userRole');
    var role = '';
    if ( id == '1') {
      role = 'Administrator';
    } else if ( id == '2') {
      role = 'Admin';
    } else if ( id == '3') {
      role = 'Employee';
    } else {
      role = 'Cashier'
    }
    return role;
  }

  authUser(user: UserForSignin) {
    return this.http.post(this.baseUrl + 'User/signin', user);
  }

  registerUser(user: UserForSignup) {
    return this.http.post(this.baseUrl + 'User/signup', user);
  }

}