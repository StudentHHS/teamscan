import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {

  public teams: Object = [{naam: ". . ."}];

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
          this.teams = data;
        },
        error => {
          if(error.status=="404") { //no teams
            this.teams = [];
          } else {
            //failed
          }
          console.log("error at data request", error);
        }
      );
    }
  }

  openDashboard() {
    window.location.href = 'https://hhs-teamscan.azurewebsites.net/dashboard';
  }

  signOut(): void {
    this.authService.signOut();
    console.log("auth",this.authService.authenticated);
  }
}
