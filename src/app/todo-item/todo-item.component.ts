import { Todo } from './../todos/shared/todo.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() 
  todo: Todo = new Todo('')
  @Output() todoClicked: EventEmitter<void> = new EventEmitter()
  @Output() editClicked: EventEmitter<void> = new EventEmitter()
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter()
            
  constructor() { }

  ngOnInit(): void {
  }

  onTodoClicked(): void {
    console.log("Todo was clicked")
    this.todoClicked.emit()
  }

  onEditClicked(): void {
    console.log("onEdit todo")
    this.editClicked.emit()
  }

  onDeleteClicked(): void{
    console.log("delete todo")
    this.deleteClicked.emit()
  }

}
