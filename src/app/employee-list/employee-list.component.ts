import { Router } from '@angular/router';
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

  constructor(
    private employeeService:EmployeeService, 
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  //.pipe(first()) เป็นการปิดท่ออัติโนมัติทำให้ระบบมีประสิทธิภาพมากขึ้น
  private getEmployees(){
    this.employeeService.getEmployeeList().pipe(first()).subscribe(data =>{
    this.employees = data;
    });
  }
  
  //click แล้วส่งค่า id มาด้วย
  updateEmployee(id:number){
    this.router.navigate(['update-employee', id])
  }

  //click แล้วส่งค่า id ไปลบ
  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).pipe(first()).subscribe(data =>{
      console.log(data);
      this.getEmployees();
      });
  }

  employeeDetails(id:number){
    this.router.navigate(['employee-details', id])
  }
}
