import { Component, OnInit, NgModule } from '@angular/core';
import {Form} from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    newTodo: string;
    todos: any;
    userId: string;    

    constructor(private route: ActivatedRoute, private http: HttpClient) {      
      this.newTodo = '';
      this.todos = [];
    }

    ngOnInit() {
      console.log(this.route.snapshot.paramMap.get('id'));
      this.userId = this.route.snapshot.paramMap.get('id');
      this.displayTodoList();
    } 

    displayTodoList() {
      this.http.get('https://jsonplaceholder.typicode.com/todos?userId='+this.userId).subscribe(data => {
      // Read the result field from the JSON response.
        this.todos = data;
        console.log(this.todos);
      });
    }

    addTodo(event) {
      this.todoObj = {
        newTodo: this.newTodo,
        completed: false
      }
      this.todos.push(this.todoObj);
      this.newTodo = '';
      event.preventDefault();
    }

    deleteTodo(index) {
      this.todos.splice(index, 1);
    }

    deleteSelectedTodos() {
      //need ES5 to reverse loop in order to splice by index
      for(var i=(this.todos.length -1); i > -1; i--) {
        if(this.todos[i].completed) {
          this.todos.splice(i, 1);
        }
      }
    }

}
