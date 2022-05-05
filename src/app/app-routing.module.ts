import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
//  { path: '', component: TodosComponent }  
{path:'employees', component: EmployeeListComponent},
{path:'create-employee', component: CreateEmployeeComponent},
{path:'', redirectTo: 'employees', pathMatch: 'full'}, //router = http://localhost:4200/ ให้เอา employees มาเติมเลยจะเท่ากับ http://localhost:4200/employees
{path:'update-employee/:id', component: UpdateEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
