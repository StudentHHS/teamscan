import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TodoComponent } from './todo/todo.component';
import { TeamsComponent } from './teams/teams.component';
import { CreateTeamComponent } from './teams/createteam/createteam.component';
import { TeamComponent } from './teams/team/team.component';
import { InvullenComponent } from './teams/team/invullen/invullen.component';
import { ResultatenComponent } from './teams/team/resultaten/resultaten.component';
import { ScorenComponent } from './teams/team/resultaten/scoren/scoren.component';
import { LoginComponent } from './login/login.component';
import { AanmakenComponent} from './teams/team/aanmaken/aanmaken.component';

const routes: Routes = [
  { path: '', component: MenuComponent, data: {title: 'Teamscan'} },
  { path: 'login', component: LoginComponent, data: {title: 'Login'} },
  { path: 'todo', component: TodoComponent, data: {title: 'To Do'}  },
  { path: 'team', component: TeamsComponent, data: {title: 'Teams'}  },
  { path: 'team/create-team', component: CreateTeamComponent, data: {title: 'Nieuw Team'}  },
  { path: 'team/:id', component: TeamComponent, data: {title: 'Team'}  },
  { path: 'team/:id/aanmaken', component: AanmakenComponent, data: {title: 'Aanmaken'} },
  { path: 'team/:id/:scan', component: TeamComponent, data: {title: 'Team'}  },
  { path: 'team/:id/:scan/invullen', component: InvullenComponent, data: {title: 'Invullen'}  },
  { path: 'team/:id/:scan/resultaten', component: ResultatenComponent, data: {title: 'Resultaten'}  },
  { path: 'team/:id/:scan/resultaten/scoren', component: ScorenComponent, data: {title: 'Scoren'}  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
