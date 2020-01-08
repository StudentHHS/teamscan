import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {MatDatepickerModule} from '@angular/material/datepicker';
import * as moment from 'moment';

import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-aanmaken',
  templateUrl: './aanmaken.component.html',
  styleUrls: ['./aanmaken.component.scss'],
})
export class AanmakenComponent implements OnInit {
  minDate = new Date();
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location,
    private toastController: ToastController,
    private authService: AuthService,
    private route: ActivatedRoute) {

    }

  ngOnInit() {  }

  createTeamScan: FormGroup = this.fb.group({
    teamscannaam: ['', Validators.required],
    teamscanstartdatum: ['', Validators.required],
    teamscaneinddatum: ['', Validators.required],
    teamscanopenvraageinddatum: ['', Validators.required],
  }, {validators: this.startBeforeEnd('teamscanstartdatum', 'teamscaneinddatum', 'teamscanopenvraageinddatum')}
  );

  startBeforeEnd(start: string, eind: string, open: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let s = group.controls[start];
      let e = group.controls[eind];
      let o = group.controls[open];
      if (s.value > e.value || e.value > o.value ) {
        return {
          endBeforeStart: true
        };
      }
      return {};
    }
  }

   createTeamscan(formData: any){
    console.log("Start adding teamscan");
    console.log(formData);
    if (formData != null){
      formData.teamscanstartdatum = moment(formData.teamscanstartdatum).format("YYYY/MM/DD");
      formData.teamscaneinddatum = moment(formData.teamscaneinddatum).format("YYYY/MM/DD");
      formData.teamscanopenvraageinddatum = moment(formData.teamscanopenvraageinddatum).format("YYYY/MM/DD");
      formData.teamId = (this.route.snapshot.paramMap.get("id"));
        this.http.get(
          AuthService.apiUrl+'?function=addnewteamscan&token='+this.authService.token,
          { headers: null, responseType: 'json', params: formData }
        ).subscribe(data => {
          console.log("returned",data);
          this.showToast("Teamscan is aangemaakt");
          this.location.back();
        },
        error => {
          this.showToast("Er is een fout opgetreden. Probeer het nog een keer aub.");
          console.log("error at data adding new teamscan", error);
        }
      );
    }
  }

  async showToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
}
