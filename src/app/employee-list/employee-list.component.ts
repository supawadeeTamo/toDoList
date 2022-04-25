import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService:EmployeeService ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  //.pipe(first()) เป็นการปิดท่ออัติโนมัติทำให้ระบบมีประสิทธิภาพมากขึ้น
  private getEmployees(){
    this.employeeService.getEmployeeList().pipe(first()).subscribe(data =>{
    this.employees = data;
    });
  }
  

}
