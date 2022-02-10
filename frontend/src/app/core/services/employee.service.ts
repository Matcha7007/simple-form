import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(13)]),
    devision: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      id: 0,
      name: '',
      address: '',
      phone: '',
      devision: ''
    });
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'Employee/employee');
  }

  addEmployee(employee:any) {    
    return this.http.post(this.baseUrl + 'Employee/post', employee);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.baseUrl + 'Employee/update/' + employee.id , employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + 'Employee/delete/' + id);
  }

  populateForm(employee:Employee) {
    this.form.setValue(employee);
  }
}
