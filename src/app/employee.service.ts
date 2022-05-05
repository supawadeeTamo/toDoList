import { Employee } from './employee';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:4200/api/v1/employees";
  private createURL = "http://localhost:4200/api/v1/create/employees";
  constructor(private httpClient: HttpClient) { 
  }
  getEmployeeList(): Observable<Employee[]>{
      return this.httpClient.get<Employee[]>(`${this.baseURL}`)
  }

  createEmployee(employee: Employee): Observable<any>{
    return this.httpClient.post(`${this.createURL}`, employee);
  }

}
