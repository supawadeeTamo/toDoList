import { EditTodoDialogComponent } from './../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from './shared/data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './shared/todo.model';
import { NgForm } from '@angular/forms';
import { from, isEmpty } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
  todos: Todo[] = []
  showValidationErrors: Boolean = true 

  constructor(private DataService:DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.DataService.getAllTodos()
  }

  onFormSubmit(fromScreen:NgForm){
     
    console.log("Form submited")
    console.log(fromScreen)
  
    if(fromScreen.value.text !== ""&&fromScreen.value.text?.length>2) /*fromScreen.invalid*/{
      this.DataService.addTodo(new Todo(fromScreen.value.text))
      fromScreen.reset()
      this.showValidationErrors = false
    }
    else if(fromScreen.value.text == null){
      this.showValidationErrors = true
    }
    console.log(this.showValidationErrors)
  }

  toggleCompleted(todo:Todo){
    //set todo to completed
    todo.completed = !todo.completed
  }

  editTodo(todo:Todo){
    //This time update have to there are 2 topic
    //1. index 2. new data from user
    console.log("edit todos")
    const index = this.todos.indexOf(todo)
    let dialogRef = this.dialog.open(EditTodoDialogComponent,{ 
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.DataService.updateTodo(index, result)
      }
      console.log(result)
    })
    //this.DataService.update/Todo(index,todo.text)
  }

  deleteTodo(todo:Todo){
    const index = this.todos.indexOf(todo)
    console.log(index)
    this.DataService.deleteTodo(index)
  }

}
