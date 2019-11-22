import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-aanmaken',
  templateUrl: './aanmaken.component.html',
  styleUrls: ['./aanmaken.component.css'],
})
export class AanmakenComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private location: Location,
    private toastController: ToastController,
    private authService: AuthService,
    private fb: FormBuilder,) {}

  ngOnInit() {}

  createTeamScanForm: FormGroup = this.fb.group({
    naam: ['', Validators.required],
    beginDatum: ['', Validators.required],
    eindDatum: ['', Validators.required]
  });

  onSubmit(formData: any){
    console.log(formData);
    console.log(this.createTeamScanForm.valid);
    if(this.createTeamScanForm.valid){
    this.http.get(
      'https://teamscan.ga/api/?function=createnewteamscan&token='+this.authService.token,
      { headers: null, responseType: 'json', params: formData })
      .subscribe(data => {
        console.log("send",data);
      },
      error => {
        this.showToast("We konden de gegevens niet opslaan. Ben je nog verbonden?", 3000);
        console.log("error at data request", error);
        }
      );
    }
  }

  async showToast(text: string, duration: number) {
    const toast = await this.toastController.create({
      message: text,
      duration: duration,
    });
    toast.present();
  }
}
