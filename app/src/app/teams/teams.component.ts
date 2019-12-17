import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, animate, style, group } from '@angular/animations'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./../menu/menu.component.css','./teams.component.css'],
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

export class TeamsComponent {
  constructor(private http: HttpClient,
    private toastController: ToastController, private authService: AuthService) {}

    public teams: Object = null;
    requestFailed: Boolean=false;

    ngOnInit() {
      this.getData();
    }

    getData() {
      if(this.authService.token) {
        this.http.get(
            AuthService.apiUrl+'?function=getteams&token='+this.authService.token,
            { headers: null, responseType: 'json' }
          ).subscribe(data => {
            console.log("resultaat");
            console.log(data);
            this.requestFailed = false;
            this.teams = data;
          },
          error => {
            if(error.status=="404") {
              this.teams = [];
            } else {
              this.showToast("De vragen konden niet worden ingeladen. Ben je nog verbonden?", 3000);
              this.requestFailed = true;
            }
            console.log("error at data request", error);
          }
        );
      } else {
        setTimeout(this.getData.bind(this),100);
      }
    }

  reload() {
    this.teams=null;
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
