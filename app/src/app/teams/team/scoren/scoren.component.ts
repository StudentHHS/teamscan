import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-scoren',
  templateUrl: './scoren.component.html',
  styleUrls: []
})

export class ScorenComponent implements OnInit {
  constructor(private http: HttpClient, private location: Location,
    private toastController: ToastController, private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  public scoringdata: any = Array();
  public dimensions: Object = Array();
  objectKeys = Object.keys;
  requestFailed: Boolean = false;

  ngOnInit() {
    this.getData();
  }

  sliderForm: FormGroup = this.fb.group({
    teamscan: this.route.snapshot.paramMap.get('scan')
  });

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length <= 1)
      return { validateArrayNotEmpty: { valid: false } };
    return null;
  }

  getData() {
    // Ophalen van de ingevulde open vragen uit de teamscan
    this.http.get(
      AuthService.apiUrl,
      { headers: { Authorization: "Bearer " + this.authService.token }, responseType: 'json', params: { function: "scoren", teamscan: this.route.snapshot.paramMap.get('scan') } }
    ).subscribe(data => {
      console.log(data);
      this.requestFailed = false;
      this.scoringdata = data;
      for (let gebruiker of this.objectKeys(data))
        this.sliderForm.addControl(data[gebruiker].gebruiker_id, new FormControl('', [Validators.required]));
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

  save(formData: any) {
    console.log(formData);
    let data: FormData = new FormData();        
    for ( let key in formData) {
      data.append(key, formData[key]);
    }
    this.http.post(
      AuthService.apiUrl, data,
      { headers: { Authorization: "Bearer " + this.authService.token }, responseType: 'json', params: { function: "addOpenEndedQuestionScore" } })
      .subscribe(data => {
        console.log("send", data)
        this.showToast('Je antwoorden zijn opgeslagen!', 2000);
        this.location.back();
      }, error => {
        console.log(error.message);
        this.showToast('We ondervonden een probleem bij het verzenden.', 2000);
      });
  }
}