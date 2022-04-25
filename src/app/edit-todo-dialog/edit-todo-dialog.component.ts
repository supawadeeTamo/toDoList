import { Todo } from './../todos/shared/todo.model';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})

export class EditTodoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo:Todo) { }

  ngOnInit() {
  }

  onFormSubmit(form:NgForm){
    //this.todo.text = form.value.text ความหมายน่าจะเหมือนกับตัวข้างล่าง

    console.log("form invalid "+form.invalid)
    if(form.invalid) return
    const updateTodo = {
      ...this.todo,
      ...form.value
    }

    this.dialogRef.close(updateTodo)
   
  }

  close(){
    this.dialogRef.close()
  }
}
