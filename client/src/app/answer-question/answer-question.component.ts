import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {User} from '../user';
import {Question} from '../question';
import {Answer} from '../answer';
@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent implements OnInit {
  name;
  question;
  questionID;
  Answer: Answer = new Answer();
  answer = "";
  detail = "";
  constructor(private _route: Router, private _apiService: ApiService, private _router: ActivatedRoute) {
    this._router.paramMap.subscribe( params => {
      this.questionID = params.get('id')
    })
   }

   ngOnInit() {
    this.name = this._apiService.getUser();
    this._apiService.retrieveAll();
    this._apiService.questions.subscribe(
      (question) => {
        this.question = question;
        if(question) {
          for (var i in question) {
            if(question[i]['_id'] == this.questionID) {
              this.question.name = question[i]['name'];
              this.question.question = question[i]['question'];
              this.question.description = question[i]['description'];
              this.question.answers = question[i]['_answers'];
            }
          }
        }
      }
    )
  }

  createNewAnswer() {
    this.Answer.name = this.name.name;
    this.Answer.answer = this.answer;
    this.Answer.detail = this.detail;
    this._apiService.createNewAnswer(this.questionID, this.Answer);
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

  goQuestion(id) {
    this._route.navigateByUrl('/dashboard/question/', id);
  }

}
