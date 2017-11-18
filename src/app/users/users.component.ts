import { Component, OnInit } from '@angular/core';
import {Form} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;

  constructor(private http: HttpClient) { 
    this.users = [];
  }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {      
        this.users = data;
        console.log(this.users);
      });    
  }

}
