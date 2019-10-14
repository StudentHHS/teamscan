import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, data: {title: 'Teamscan'} },
  { path: 'todo', component: TodoComponent, data: {title: 'To Do'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
