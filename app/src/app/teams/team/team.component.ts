import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';
import { AuthService } from 'src/app/auth.service';
import { ToastController } from '@ionic/angular';
import { trigger, transition, animate, style, group } from '@angular/animations'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material'
import * as moment from 'moment';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./../teams.component.css'],
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
  ],
  
})

export class TeamComponent {
  public id: string;
  public teamscan: string = null;
  requestFailed: Boolean=false;
  public teamdata : any = Array();
  public teamscans: any = null;
  moment: any = moment;
  public daysUntillStatusEnd= null;
  public progressBarValue=0;
  public startDate=null;
  public endDate=null;

  constructor(
    private route: ActivatedRoute,
    private us: UtilityService,
    private http: HttpClient,
    private authService: AuthService,
    private toastController: ToastController,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.paramMap.get('scan')) {
      this.teamscan = this.route.snapshot.paramMap.get('scan');
    }
    this.getData();
  }

  getData() {
    if(this.authService.token) {
      var params: any = {teamid: this.id, function: "getteam"};
      if(this.teamscan) {
        params.teamscan = this.teamscan;
      }
      this.http.get(
          AuthService.apiUrl,
          { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: params }
        ).subscribe(data => {
          console.log("resultaat");
          console.log(data);
          this.requestFailed = false;
          this.teamdata = data;
          if(this.teamdata.team)
            this.us.changeTitle(this.teamdata.team.naam);
          if(this.teamdata.teamscan) {
            if(this.teamdata.teamscan.status=="invullen") {
              this.startDate = new Date(this.teamdata.teamscan.start);
              this.endDate = new Date(this.teamdata.teamscan.eind);
            }
            if(this.teamdata.teamscan.status=="scoren" || this.teamdata.teamscan.status=="gesloten" ) {
              this.startDate = new Date(this.teamdata.teamscan.eind);
              this.endDate = new Date(this.teamdata.teamscan.eindOpenVraag);
            }
            var diff = this.endDate.getTime() - new Date().getTime();
            this.daysUntillStatusEnd = Math.ceil(diff / (1000 * 3600 * 24)); 
            this.progressBarValue=((new Date().getTime() - this.startDate.getTime()) / ( this.endDate.getTime() - this.startDate.getTime()))*100;
          }
        },
        error => {
          this.showToast("De vragen konden niet worden ingeladen. Ben je nog verbonden?", 3000);
          this.requestFailed = true;
          console.log("error at data request", error);
        }
      );
    } else {
      setTimeout(this.getData.bind(this),100);
    }
  }

  getTeamscan() {
    if(this.authService.token) {
      var params: any = {teamid: this.id, function: "getteamscans"};
      this.http.get(
        AuthService.apiUrl,
          { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: params }
        ).subscribe(data => {
          this.teamscans = data;
        },
        error => {
          this.showToast("Er is een probleem met het ophalen van de data, probeer het nog een keer aub.", 3000);
          console.log("error at data request", error);
        }
      );
    } else {
      setTimeout(this.getTeamscan.bind(this),100);
    }
  }

  teamscanChangeState(teamscanId : any, state: string) {
    console.log(teamscanId);
      let data: FormData = new FormData();  
      data.append("teamscanid", teamscanId);
      data.append("status", state);
      var params: any = {teamscanid: teamscanId, function: "updateteamscanstatus"};
      this.http.post(
        AuthService.apiUrl, data,
          { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: params }
        ).subscribe(data => {
          console.log(data);
          this.reload();
        },
        error => {
          this.showToast("Er is een probleem ontstaan, probeer het nog een keer.", 3000);
          console.log("error at data request", error);
        }
      );
  }
  
  closeTeamscan(teamscanId : any) {
    if(confirm("Weet u zeker dat u de teamscan wilt sluiten?")){
      console.log(teamscanId);
        var params: any = {teamscanid: teamscanId, function: "closeteamscan"};
        this.http.get(
          AuthService.apiUrl,
            { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: params }
          ).subscribe(data => {
            console.log(data);
          },
          error => {
            this.showToast("Er is een probleem ontstaan, probeer het nog een keer.", 3000);
            console.log("error at data request", error);
          }
        );
    }
  }

  reload() {
    this.getData();
    this.teamdata=Array();
    this.requestFailed = false;
  }

  updateBeheerder(beheerder, userPrincipalName, mail) {
    console.log(beheerder, userPrincipalName, mail);
    let data: FormData = new FormData();
    data.append('beheerder', beheerder);
    data.append('userPrincipalName', userPrincipalName);
    data.append('mail', mail);
    data.append('teamid', this.id);
    this.http.post(
        AuthService.apiUrl, data,
        { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {function: "teambeheerder"} }
      ).subscribe(data => {
        console.log("resultaat");
        console.log(data);
        this.teamdata = data;
      },
      error => {
        this.showToast("Het is niet gelukt een aanpassing te maken.", 3000);
        this.requestFailed = true;
        console.log("error at data request", error);
      }
    );
  }

  openteamscanmenu() {
    if(!this.teamscans) {
      this.http.get(
          AuthService.apiUrl,
          { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {teamid: this.id, function: "getteamscans"} }
        ).subscribe(data => {
          console.log("resultaat",data);
          this.teamscans = data;
        },
        error => {
          this.showToast("De teamscans konden niet worden ingeladen. Ben je nog verbonden?", 3000);
          console.log("error at data request", error);
        }
      );
    }
  }

  verwijderLid(userPrincipalName, mail) {
    var context=this;
    let data: FormData = new FormData();
    data.append('userPrincipalName', userPrincipalName);
    data.append('mail', mail);
    data.append('teamid', this.id);
    this.http.post(
      AuthService.apiUrl, data,
      { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {function: "verwijderlid"} })
      .subscribe(data => {
        console.log("send",data)
        this.showToast('Gebruker is verwijderd!', 2000);
        context.reload();
      }, error => {
        this.showToast('We ondervonden een probleem bij het verzenden.', 3000);
      });
  }
    
  addmemberform: FormGroup = this.fb.group({
    email: ['', [Validators.required, this.validateEmail]]
  });

  onSubmitMember(formData, menuTrigger) {
    console.log(formData);
    let data: FormData = new FormData();        
    for ( let key in formData) {
      data.append(key, formData[key]);
    }
    data.append("teamid", this.id);
    if(this.addmemberform.valid){
      this.http.post(
        AuthService.apiUrl, data,
        { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {function: "nieuwlid"} })
        .subscribe(data => {
          console.log("send",data)
          this.showToast('De wijziging is opgeslagen!', 2000);
          menuTrigger.closeMenu();
          this.reload();
        }, error => {
          this.showToast('We ondervonden een probleem bij het verzenden.', 3000);
        });
    }
  }

  //Check of het echt een email is.
  validateEmail(c: FormControl) {
    var email = c.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())) {
      return null;
    } else {
      return {validateArrayNotEmpty: { valid: false } };
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
