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
  private getByIdURL = "http://localhost:4200/api/v1/employees/"
  private updateURL = "http://localhost:4200/api/v1/employees/"
  private deleteURL = "http://localhost:4200/api/v1/employees/"
  
  constructor(private httpClient: HttpClient) { 
  }
  getEmployeeList(): Observable<Employee[]>{
      return this.httpClient.get<Employee[]>(`${this.baseURL}`)
  }

  createEmployee(employee: Employee): Observable<any>{
    return this.httpClient.post(`${this.createURL}`, employee);
  }

  getEmployeeById(id:number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.getByIdURL}/${id}`);
  }

  updateEmployee(id:number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.updateURL}/${id}`,employee);
  }

  deleteEmployee(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.deleteURL}/${id}`);
  }
}
