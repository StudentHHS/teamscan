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

  createTeamscan(){
    this.showToast("De vragen konden niet worden ingeladen. Ben je nog verbonden?");
  }

  async showToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
}
