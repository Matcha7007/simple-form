import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'Employee/employee');
  }

  addEmployee(employee: any[]) {
    return this.http.post(this.baseUrl + 'Employee/post', employee);
  }

  updateEmployee(employee: Employee, id: number) {
    return this.http.put(this.baseUrl + 'Employee/update/' + id , employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + 'Employee/delete/' + id);
  }
}
