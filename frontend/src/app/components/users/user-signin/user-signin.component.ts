import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserForSignin } from 'src/app/models/user';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit {

  hide = true;
  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    //memanggil fungsi service authUser
    this.auth.authUser(loginForm.value).subscribe(
      (response: UserForSignin) => {
        console.log(response);
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token); //menyimpan token dari api ke lokal storage
          localStorage.setItem('userName', user.userName); //menyimpan userName dari api ke lokal storage
          localStorage.setItem('userRole', user.userRole);
          this.router.navigate(['/main']); //mendirect ke halaman main
          this.alert.alertSuccess('Signin Success!');
        }
      }
    )
  }

}
