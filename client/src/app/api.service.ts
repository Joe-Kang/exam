import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
@Injectable()
export class ApiService {
  questions = new BehaviorSubject([]);
  User: User = new User();

  constructor(private _http: HttpClient) { }

  retrieveAll() {
    this._http.get('/dashboard').subscribe(
      (response: any[]) =>{
        this.questions.next(response)
      }
    )
  }

  createNewQuestion(question) {
    this._http.post('/createNewQuestion', question).subscribe(
      (response: any[]) => {
        this.retrieveAll();
      }
    )
  }

  createNewAnswer(id, answer) {
    this._http.post('/createNewAnswer/'+id, answer).subscribe(
      (response: any[]) => {
        this.retrieveAll();
      }
    )
  }

  like(answer) {
    this._http.post('/like/'+ answer._id, answer).subscribe(
      (response: any[]) => {
        this.retrieveAll();
      }
    )
  }


  getUser() {
    return this.User;
  }

  newUser(user: string) {
    this.User.name = user;
  }

}
