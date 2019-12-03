import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';
import { AuthService } from 'src/app/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./../teams.component.css']
})

export class TeamComponent {
  public id: string;
  requestFailed: Boolean=false;
  public teamdata : Object = Array();
  public teamscandata : Object = Array();

  constructor(
    private route: ActivatedRoute,
    private us: UtilityService,
    private http: HttpClient,
    private authService: AuthService,
    private toastController: ToastController) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.getData();
    this.getTeamscan();
  }

  getData() {
    if(this.authService.token) {
      this.http.get(
          'https://teamscan.ga/api/?function=getteam&token='+this.authService.token,
          { headers: null, responseType: 'json', params: {teamid: this.id} }
        ).subscribe(data => {
          console.log("resultaat");
          console.log(data);
          this.requestFailed = false;
          this.teamdata = data;
          if(this.teamdata[0])
            this.us.changeTitle(this.teamdata[0].naam);
        },
        error => {
          this.showToast("De vragen konden niet worden ingeladen. Ben je nog verbonden?", 3000);
          this.requestFailed = true;
          console.log("error at data request", error);
        }
      );
    } else {
      setTimeout(this.getData.bind(this),100);
    }
  }

  getTeamscan() {
    if(this.authService.token) {
      this.http.get(
          'https://teamscan.ga/api/?function=getteamscan&token='+this.authService.token,
          { headers: null, responseType: 'json', params: {teamid: this.id} }
        ).subscribe(data => {
          this.teamscandata = data;
        },
        error => {
          this.showToast("Er is een probleem met het ophalen van de data, probeer het nog een keer aub.", 3000);
          console.log("error at data request", error);
        }
      );
    } else {
      setTimeout(this.getTeamscan.bind(this),100);
    }
  }

  closeTeamscan(teamscanId : any) {
    console.log(teamscanId);
    if(this.authService.token) {
      this.http.get(
          'https://teamscan.ga/api/?function=closeteamscan&token='+this.authService.token,
          { headers: null, responseType: 'json', params: {teamscanid: teamscanId} }
        ).subscribe(data => {
          console.log(data);
        },
        error => {
          this.showToast("Er is een probleem ontstaan, probeer het nog een keer.", 3000);
          console.log("error at data request", error);
        }
      );
    } else {
      setTimeout(this.closeTeamscan.bind(this),100);
    }
  }

  reload() {
    this.getData();
    this.getTeamscan();
    this.requestFailed = false;
  }
    
  async showToast(text: string, duration: number) {
    const toast = await this.toastController.create({
      message: text,
      duration: duration,
    });
    toast.present();
  }
}
