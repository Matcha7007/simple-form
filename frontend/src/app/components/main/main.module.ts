import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { MaterialModule } from 'src/app/core/material.module';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './modules/employee/add-employee/add-employee.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    HomeComponent,
    EmployeeComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class MainModule { }
