import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  
  constructor(
    private employeeService: EmployeeService, //เป็นการเรียกใช้ service
    private router: Router
    ) { }

  ngOnInit() {
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error))
  }

  goToEmployeeList(){
    console.log(5555)
    this.router.navigate(['/employees']);
  }

  onSubmit(){
    console.log(this.employee)
    this.saveEmployee()
    
  }

}
