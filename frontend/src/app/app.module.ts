import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSigninComponent } from './components/users/user-signin/user-signin.component';
import { UserSignupComponent } from './components/users/user-signup/user-signup.component';
import { MaterialModule } from './core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { AlertComponent } from './dialogs/alert/alert.component';
import { AlertService } from './core/services/alert.service';
import { EmployeeService } from './core/services/employee.service';
import { SignoutComponent } from './dialogs/signout/signout.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSigninComponent,
    UserSignupComponent,
    AlertComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AlertService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
