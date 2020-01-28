import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { trigger, transition, animate, style, group } from '@angular/animations'

export interface OpleidingenGroup {
  naam: string;
  opleidingen: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) >= 0);
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('grow', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        group([
          animate("200ms cubic-bezier(0,.97,.53,1)", style({ height: '*' })),
          animate('400ms ease-out', style({ 'opacity': '1' }))
        ])
      ])
    ])
  ]
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
    private location: Location) {
    }

    private user: any = null;
    requestFailed: Boolean = false;

    stateGroups: OpleidingenGroup[];
    stateGroupOptions: Observable<OpleidingenGroup[]>;


    ngOnInit() {
      this.getData();
    }

    getOpleidingen() {
      this.http.get( AuthService.apiUrl,
        { headers: {Authorization: "Bearer "+this.authService.token}, responseType: 'json', params: {function: 'faculteitenopleiding'} }
      )
      .subscribe(data => {
        console.log("returned",data);
        var dedata:any = data;
        this.stateGroups=dedata;
        this.stateGroupOptions = this.stateForm.get('opleidingEnFaculteit')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGroup(value))
        );
        this.stateForm.removeControl("opleidingEnFaculteit");
        this.stateForm.addControl("opleidingEnFaculteit", new FormControl(this.user.opleiding + " — " + this.user.faculteit,[this.validateFaculteit.bind(this)]));
      },
      error => {
        this.showToast("We konden de opleidingen en diensten niet ophalen. Ben je nog verbonden?", 3000);
        console.log("error at data request", error);
      });
    }

    private _filterGroup(value: string): OpleidingenGroup[] {
        if (value) {
            return this.stateGroups
            .map(group => ({naam: group.naam, opleidingen: _filter(group.opleidingen, value)}))
            .filter(group => group.opleidingen.length > 0);
        }
        return this.stateGroups;
    }

  async showToast(text: string, duration: number) {
    const toast = await this.toastController.create({
      message: text,
      duration: duration,
    });
    toast.present();
  }

  validateFaculteit(c: FormControl) {
    var value = c.value.split(" — ");
    if(!c.value) return null;
    var opleiding = value[0];
    var faculteit = value[1];

    function zoekFaculteit(e) {
        return e.naam === faculteit;
    }

    var faculteitsGroep = this.stateGroups.find(zoekFaculteit);
    if(!faculteitsGroep) return {
        validateFaculteit: {
          valid: false
        }
      };
    var index = faculteitsGroep.opleidingen.indexOf(opleiding);
    console.log(index);
    return index > -1 ? null : {
      validateFaculteit: {
        valid: false
      }
    };
}

getData() {
  if(this.authService.token) {
    this.http.get(
      AuthService.apiUrl,
       { headers: {Authorization: "Bearer " + this.authService.token}, responseType: 'json', params: {function: "user"}}
     ).subscribe(data => {
      this.getOpleidingen();
      this.requestFailed = false;
      this.user = data;
      this.stateForm.setValue({
        opleidingEnFaculteit: this.user.opleiding + " — " + this.user.faculteit,
        geslacht: this.user.geslacht,
        opOfObp: this.user.opOfObp,
        contractsoort: this.user.contractsoort,
        locatie: this.user.locatie,
        geboortejaar: this.user.geboortejaar,
        aanstellingsomvang: this.user.aanstellingsomvang,
        startjaarDienst: this.user.startjaarDienst,
        startjaarOnderwijs: this.user.startjaarOnderwijs,
        startjaarFunctie: this.user.startjaarFunctie
      });
      console.log(this.stateForm.value);
     },
     error => {
       if(error.status=="404") {
         this.user = [];
       } else {
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
  this.getData();
  this.user = null;
  this.requestFailed = false;
}

stateForm: FormGroup = this._formBuilder.group({
    opleidingEnFaculteit:  new FormControl('', [Validators.required]),
    geslacht: new FormControl('', [Validators.required]),
    opOfObp: new FormControl('', [Validators.required]),
    contractsoort: '',
    locatie: '',
    geboortejaar: new FormControl('', [Validators.min(1900), Validators.max(2100), Validators.pattern("^[0-9]*$")]),
    aanstellingsomvang: new FormControl('', [Validators.pattern("^(0(\.[0-9])?|1\.0|1)$")]),
    startjaarDienst:  new FormControl('', [Validators.min(1900), Validators.max(2100), Validators.pattern("^[0-9]*$")]),
    startjaarOnderwijs:  new FormControl('', [Validators.min(1900), Validators.max(2100), Validators.pattern("^[0-9]*$")]),
    startjaarFunctie:  new FormControl('', [Validators.min(1900), Validators.max(2100), Validators.pattern("^[0-9]*$")])
});

onSubmit(formData: any) {
  console.log(formData);
  this.http.get(
    AuthService.apiUrl+'?function=saveuserinfo&token='+this.authService.token,
    { headers: null, responseType: 'json', params: formData }
  )
  .subscribe(data => {
    console.log("returned",data);
    this.location.back();
  },
  error => {
    this.showToast("We konden de gegevens niet opslaan. Ben je nog verbonden?", 3000);
    console.log("error at data request", error);
  });
}

  signOut(): void {
    this.authService.signOut();
    this.location.back();
    console.log("auth",this.authService.authenticated);
  }
}
