import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {MatDatepickerModule} from '@angular/material/datepicker';

import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-aanmaken',
  templateUrl: './aanmaken.component.html',
  styleUrls: ['./aanmaken.component.scss'],
})
export class AanmakenComponent implements OnInit {
  constructor(
    private http: HttpClient, 
    private location: Location,
    private toastController: ToastController, 
    private authService: AuthService) {

    }

  ngOnInit() {}

  createTeamscan(formData: any){
    // console.log(formData);
    //     this.http.get(
    //       'https://teamscan.ga/api/?function=saveuserinfo&token='+this.authService.token,
    //       { headers: null, responseType: 'json', params: formData }
    //     ).subscribe(data => {
    //       console.log("returned",data);
    //       stepper.selected.completed = true;
    //       stepper.next();
    //     },
    //     error => {
    //       this.showToast("We konden de gegevens niet opslaan. Ben je nog verbonden?", 3000);
    //       console.log("error at data request", error);
    //     }
    //   );
  }

  async showToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
}
