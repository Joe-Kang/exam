import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {User} from '../user';
import {Question} from '../question';
@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  Question: Question = new Question();
  name;
  question = "";
  description = "";

  constructor(private _route: Router, private _apiService: ApiService) { }

  ngOnInit() {
    this.name = this._apiService.getUser();
  }

  createNewQuestion() {
    this.Question.name = this.name.name;
    this.Question.question = this.question;
    this.Question.description = this.description;
    this._apiService.createNewQuestion(this.Question);
    this._route.navigateByUrl('dashboard');
  }

  goHome() {
    this._route.navigateByUrl('dashboard');
  }

  logout() {
    this.name = {
      name: '',
    }
    this._apiService.newUser(this.name.name);
    this._route.navigateByUrl('/');
  }

}
