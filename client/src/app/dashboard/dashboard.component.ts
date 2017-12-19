import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {User} from '../user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name;
  questions: any[];
  constructor(private _route: Router, private _apiService: ApiService) {
    this.name = this._apiService.getUser();
   }

  ngOnInit() {
    this._apiService.questions.subscribe(
      (response) => {
        this.questions = response
      })
      this._apiService.retrieveAll();
  }

  logout() {
    this.name = {
      name: '',
    }
    this._apiService.newUser(this.name.name);
    this._route.navigateByUrl('/');
  }

  newQuestion() {
    this._route.navigateByUrl('newQuestion');
  }

  goToQuestion(id) {
    this._route.navigateByUrl('question/' + id);
  }
}
