import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-scoren',
    templateUrl: './scoren.component.html',
    styleUrls: []
})

export class ScorenComponent implements OnInit{
    constructor(private http: HttpClient, private location: Location,
        private toastController: ToastController, private authService: AuthService,
        private route: ActivatedRoute) {}

      public scoringdata : any = Array();
      public dimensions: Object = Array();
      objectKeys = Object.keys;
      requestFailed: Boolean = false;

    ngOnInit(){
        this.getData();
    }

    getData() {
        // Ophalen van de ingevulde open vragen uit de teamscan
        this.http.get(
          AuthService.apiUrl,
          { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {function:"scoren", teamscan: this.route.snapshot.paramMap.get('scan')} }
        ).subscribe(data => {
          console.log("resultaat");
          console.log(data);
          this.requestFailed = false;
          this.scoringdata = data;
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
    
      save() {
        this.showToast('Uw antwoord is opgeslagen!',3000);
        this.location.back();
      }
}