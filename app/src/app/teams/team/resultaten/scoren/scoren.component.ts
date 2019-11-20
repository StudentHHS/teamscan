import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
    selector: 'app-scoren',
    templateUrl: './scoren.component.html',
    styleUrls: []
})

export class ScorenComponent implements OnInit{
    constructor(private http: HttpClient, private location: Location,
        private toastController: ToastController, private authService: AuthService) {}
    
      result: Array<Object>;
      public dimensions: Object = Array();
      objectKeys = Object.keys;
      requestFailed = false;

    besteOpenVragen = [
        { antwoord: "Als we een sterker team willen vormen moet de communicatie beter gaan verlopen." },
        { antwoord: "Als we een hechter team willen worden, dan moet er van meerdere collega's input komen wanneer er verkeerd gehandeld wordt zodat we dit kunnen aanpakken." },
        { antwoord: "Wanneer er meerdere uitjes worden gehouden per jaar zullen wij een sterker teamsverband creëeren" }
    ]

    ngOnInit(){
        this.getData();
    }

    getData() {
        // Ophalen van de ingevulde open vragen uit de teamscan
      }

    reload() {
        this.getData();
        this.requestFailed = false;
      }
    
      async showToast(text: string) {
        const toast = await this.toastController.create({
          message: text,
          duration: 3000,
        });
        toast.present();
      }
    
      save() {
        this.showToast('Uw antwoord is opgeslagen!');
        this.location.back();
      }
}