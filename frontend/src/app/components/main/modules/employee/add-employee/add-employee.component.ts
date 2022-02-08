import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private empService: EmployeeService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  
}
