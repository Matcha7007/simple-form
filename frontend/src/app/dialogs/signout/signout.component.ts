import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {
  user: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('userName');
  }

  loggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }

}
