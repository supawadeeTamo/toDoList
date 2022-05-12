import { first } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from './../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';

export interface DialogData {
  firstName: string;
  lastName: string;
  emailId: string;
}

@Component({
  selector: 'app-create-employee-form',
  templateUrl: './create-employee-form.component.html',
  styleUrls: ['./create-employee-form.component.css']
})
export class CreateEmployeeFormComponent implements OnInit {



  constructor(

    private dialogRef: MatDialogRef<CreateEmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, //access the data in your dialog component
    private employeeService: EmployeeService,
    private router: Router

  ) { }

  form = new FormGroup({
    firstName: new FormControl({ value: null, disabled: false }, Validators.required),
    lastName: new FormControl({ value: null, disabled: false }, Validators.required),
    emailId: new FormControl({ value: null, disabled: false }, Validators.required),
  });

  ValidateAmount(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        return { valid: true }
      }
      return null;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log( this.dialogRef.close(this.form.getRawValue()))
    this.employeeService.createEmployee(this.form.getRawValue()).pipe(first()).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: error => console.log(error)
    })
    this.dialogRef.close(this.form.getRawValue())
  }


}
