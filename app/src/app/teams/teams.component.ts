import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./../menu/menu.component.css','./teams.component.css']
})

export class TeamsComponent {
  constructor(private http: HttpClient,
    private toastController: ToastController, private authService: AuthService) {}

    public teams: Object = Array();
    requestFailed: Boolean=false;

    ngOnInit() {
      this.getData();
    }

    getData() {
    this.http.get(
        'https://teamscan.ga/api/?function=getteams&token='+this.authService.token,
        { headers: null, responseType: 'json' }
      ).subscribe(data => {
        console.log("resultaat");
        console.log(data);
        this.requestFailed = false;
        this.teams = data;
      },
      error => {
        this.showToast("De vragen konden niet worden ingeladen. Ben je nog verbonden?", 3000);
        this.requestFailed = true;
        console.log("error at data request", error);
      }
    );
  }

  reload() {
    this.getData();
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
