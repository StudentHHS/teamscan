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
  public teamdata : any = Array();

  constructor(
    private route: ActivatedRoute,
    private us: UtilityService,
    private http: HttpClient,
    private authService: AuthService,
    private toastController: ToastController) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.getData();
  }

  getData() {
    if(this.authService.token) {
      this.http.get(
          AuthService.apiUrl,
          { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {teamid: this.id, function: "getteam"} }
        ).subscribe(data => {
          console.log("resultaat");
          console.log(data);
          this.requestFailed = false;
          this.teamdata = data;
          if(this.teamdata.team)
            this.us.changeTitle(this.teamdata.team.naam);
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

  reload() {
    this.getData();
    this.requestFailed = false;
  }

  updateBeheerder(beheerder, userPrincipalName, mail) {
    console.log(beheerder, userPrincipalName, mail);
    let data: FormData = new FormData();
    data.append('beheerder', beheerder);
    data.append('userPrincipalName', userPrincipalName);
    data.append('mail', mail);
    data.append('teamid', this.id);
    this.http.post(
        AuthService.apiUrl, data,
        { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {function: "teambeheerder"} }
      ).subscribe(data => {
        console.log("resultaat");
        console.log(data);
        this.teamdata = data;
      },
      error => {
        this.showToast("Het is niet gelukt een aanpassing te maken.", 3000);
        this.requestFailed = true;
        console.log("error at data request", error);
      }
    );
  }
    
  async showToast(text: string, duration: number) {
    const toast = await this.toastController.create({
      message: text,
      duration: duration,
    });
    toast.present();
  }
}
