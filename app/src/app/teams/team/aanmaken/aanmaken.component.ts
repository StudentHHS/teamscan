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
  });

  //https://teamscan.ga/api/?function=addnewteamscan&token=a58de5805bdff2512b9357b7d708886aba083a95afca9bfae6495a058f3c0d3bf049d355a3d5a5122917465bc178f7fbac3f981eff3768c51b7fc8eeea9e8e5e.14d2d0b008b82da0a3e446977da5e63da780c7b3e54cb85f6e0d1faed180a5e2421084a857e5567695b6d1d99a1de80bf5705b53547d8a065dc7ff8e361d6ea9d43d41367e65fc7e1200f76da6b4d98a8c5153bbe359d26645a10ae949ed6efe06a0727464ef1cf0442b53065885c87cc0be0c70b57f070afb10d6d83afaa3eca979c0d8ffe517ecc39726f5c39dd3b6d00942dd56df0097640b03a741725d690935ef70036b9d400dd8c551614671ec52306f3191316bf9348de138b098ccdead3cb710591d74d6a9e31df1fab47fbcbfa4ff8ec223f02a1e2db415578092e9736cc0545fa9d1a7f822b56973af166e0a3709b30365a93334fa3f8469e8b7674d181c1ef13a7e218116fd91d93164e7e06c80c5a4938e1eb49751b585c64ee5c7263cc4486669fb38e1eb90fb407e9e4e777fc8b2bb754de5f1f60bbdcb4411fa6e4616aa26918a61e59e552e3f751af0d17207e06fb149df503a7c30333c4191ecc74d5f2a477b87eb4c8711144ee8fccb3e6607dbe7e5076ddc28068086e38e0c50b6bfe19f5fba9fac7d001279810625f1dc226b11f31a6c2d1c5769150acb5a8ea7c28f0b84df58b2dcee26c4e459bf1bf7089b4defd98e8cb5fc97a4316446933bc2228bdf5e360fcee37fa334a3ac8cb89a8f072d50ebeada29551cc3ee2a804135946a2226902b153ef925d722db08d3cb90484adae9a412f068fbf8&teamscannaam=testteamscan&teamscanstartdatum=2019-11-27&teamscaneinddatum=2019-11-30&teamscanopenvraageinddatum=2019-12-5&teamId=30
  createTeamscan(formData: any){
    console.log("Start adding teamscan");
    console.log(formData);
    if (formData != null){
      formData.teamscanstartdatum = moment(formData.teamscanstartdatum).format("YYYY/MM/DD");
      formData.teamscaneinddatum = moment(formData.teamscaneinddatum).format("YYYY/MM/DD");
      formData.teamscanopenvraageinddatum = moment(formData.teamscanopenvraageinddatum).format("YYYY/MM/DD");
      formData.teamId = (this.route.snapshot.paramMap.get("id"));
        this.http.get(
          'https://teamscan.ga/api/?function=addnewteamscan&token='+this.authService.token,
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
