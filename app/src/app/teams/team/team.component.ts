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
  requestFailed;
  public teamdata : Object = Array();

  constructor(
    private route: ActivatedRoute,
    private us: UtilityService,
    private http: HttpClient,
    private authService: AuthService,
    private toastController: ToastController) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.us.changeTitle(this.id);
    this.getData();
  }

  getData() {
    this.http.get(
        'https://teamscan.ga/api/?function=getteam&token='+this.authService.token,
        { headers: null, responseType: 'json', params: {teamid: this.id} }
      ).subscribe(data => {
        console.log("resultaat");
        console.log(data);
        this.requestFailed = false;
        this.teamdata = data;
      },
      error => {
        this.showToast("De vragen konden niet worden ingeladen. Ben je nog verbonden?", 3000);
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
