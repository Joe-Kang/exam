import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {User} from '../user';
import {Question} from '../question';
import {Answer} from '../answer';
@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnInit {
  name;
  Question: Question = new Question();
  question;
  questionID;
  Answer: Answer = new Answer();

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
              console.log(this.question.answers);
            }
          }
        }
      }
    )
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

  like(answer) {
    this._apiService.like(answer);
  }

  answerQuestion(id) {
    this._route.navigateByUrl('answer/'+ id);
  }

}
