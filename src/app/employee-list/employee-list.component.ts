import { Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeFormComponent } from '../create-employee-form/create-employee-form.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  filters = {
    keyword: '',
    keywordLastName: '',
    keywordEmail:'',
  }

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  //.pipe(first()) เป็นการปิดท่ออัติโนมัติทำให้ระบบมีประสิทธิภาพมากขึ้น
  getEmployees() {
    this.employeeService.getEmployeeList().pipe(first()).subscribe(data => {
      this.employees = data
    });
  }

  getEmployeesName() {
    this.employeeService.getEmployeeList().pipe(first()).subscribe(data => {
      this.employees = this.filterName(data);
    });
  }

  getEmployeesLastName() {
    this.employeeService.getEmployeeList().pipe(first()).subscribe(data => {
      this.employees = this.filterLastName(data);
    });
  }

  getEmployeesEmail() {
    this.employeeService.getEmployeeList().pipe(first()).subscribe(data => {
      this.employees = this.filterEmail(data);
    });
  }
  
  //click แล้วส่งค่า id มาด้วย
  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id])
  }

  //click แล้วส่งค่า id ไปลบ
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).pipe(first()).subscribe(data => {
      console.log(data);
      this.getEmployees();
    });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id])
  }

  filterName(employee: Employee[]) {
    console.log(this.filters);
    return employee.filter((e) => {
      return e.firstName.toLowerCase().includes(this.filters.keyword.toLowerCase())
    })
  }

  filterLastName(employee: Employee[]) {
    console.log(this.filters);
    return employee.filter((e) => {
      return e.lastName.toLowerCase().includes(this.filters.keywordLastName.toLowerCase())
    })
  }

  filterEmail(employee: Employee[]) {
    console.log(this.filters);
    return employee.filter((e) => {
      return e.lastName.toLowerCase().includes(this.filters.keywordEmail.toLowerCase())
    })
  }

  Clear(){
    this.filters.keyword = ''
    this.filters.keywordLastName = ''
    this.filters.keywordEmail = ''
    this.getEmployees()
  }

  //create แบบ from component
  addEmployee(){
    const dialogRef = this.dialog.open(CreateEmployeeFormComponent, {
      height: '650px',
      width: '650px',
      data: {},
    })

    dialogRef.afterClosed().subscribe(_res=>{
      this.getEmployees();
    })
  }
}
