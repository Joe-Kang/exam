import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {User} from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name;
  constructor(private _route: Router, private _apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.name);
    this._apiService.newUser(this.name);
    this._route.navigateByUrl('dashboard');
  }



}
