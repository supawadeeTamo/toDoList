import { EmployeeService } from './../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: number = 0;
  employee: Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private employeeServiec: EmployeeService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] // get id from route
    this.employee = new Employee();
    this.employeeServiec.getEmployeeById(this.id).pipe().subscribe(data => {
      console.log(data);
      this.employee = data;
    });
  }
}
