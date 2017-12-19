import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { ShowQuestionComponent } from './show-question/show-question.component';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  {path: 'dashboard', pathMatch: 'full', component: DashboardComponent},
  {path: 'newQuestion', pathMatch: 'full', component: NewQuestionComponent},
  {path: 'dashboard/question/:id', pathMatch: 'full', component: ShowQuestionComponent},
  {path: 'dashboard/question/:id/answer', pathMatch: 'full', component: AnswerQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
