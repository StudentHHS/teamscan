import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, animate, style, group } from '@angular/animations'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('grow', [
      transition(':enter', [
        style({height: '0', opacity: 0}),
                group([
                    animate("200ms cubic-bezier(0,.97,.53,1)", style({height: '*'})),
                    animate('400ms ease-out', style({'opacity': '1'}))
                ])
      ])
    ])
  ]
})

export class MenuComponent {

  public teams: Object = null;
  public requestFailed: Boolean = false;

  constructor(private authService: AuthService, private http: HttpClient) {
    setTimeout(this.getData.bind(this),200);
  }

  getData() {
    if(this.authService.token) {
      this.http.get(
         AuthService.apiUrl,
          { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {function: "menu"}}
        ).subscribe(data => {
          console.log("resultaat", data);
          this.requestFailed = false;
          this.teams = data;
        },
        error => {
          if(error.status=="404") { //no teams
            this.teams = [];
          } else {
            this.requestFailed = true;
          }
          console.log("error at data request", error);
        }
      );
    }
  }

  reload() {
    this.getData();
    this.teams = null;
    this.requestFailed = false;
  }

  openDashboard() {
    window.location.href = AuthService.dashboardURL;
  }

  signOut(): void {
    this.authService.signOut();
    console.log("auth",this.authService.authenticated);
  }
}
