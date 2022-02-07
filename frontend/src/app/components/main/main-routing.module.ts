import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionAdminGuard } from 'src/app/core/guards/permission-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', 
    component: DashboardComponent,
    children: 
    [
      { path: 'home', component: HomeComponent },
      { path: 'employee', component: EmployeeComponent,
        canActivate: [PermissionAdminGuard] },
      { path: '', redirectTo: '/main/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/main/home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
