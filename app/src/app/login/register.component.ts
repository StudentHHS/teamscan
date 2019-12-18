import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'

export interface OpleidingenGroup {
    naam: string;
    opleidingen: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.toLowerCase().indexOf(filterValue) >= 0);
};

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  verwerkingGegevens = [{checked: false}] ;

    constructor(
        private authService: AuthService,
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        private toastController: ToastController,
        private storage: Storage
    ) {

    }

    //facultyControl = new FormControl();
    /*options: string[] = [
        'Faculteit Business, Finance & Marketing',
        'Faculteit Bestuur, Recht & Veiligheid',
        'Faculteit Gezondheid, Voeding & Sport'
    ];*/


    stateGroups: OpleidingenGroup[];
    stateGroupOptions: Observable<OpleidingenGroup[]>;


    ngOnInit() {
        this.stateGroupOptions = this.stateForm.get('opleidingEnFaculteit')!.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterGroup(value))
          );

          setTimeout(this.getOpleidingen.bind(this),300);
    }

    getOpleidingen() {
      this.http.get( AuthService.apiUrl,
        { headers: {Authorization: "Bearer "+this.authService.token}, responseType: 'json', params: {function: 'faculteitenopleiding'} }
      )
      .subscribe(data => {
        console.log("returned",data);
        var dedata:any = data;
        this.stateGroups=dedata;
      },
      error => {
        this.showToast("We konden de opleidingen niet ophalen. Ben je nog verbonden?", 3000);
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

    logOut(){
      this.authService.signOut();
    }

    onSubmit(formData: any, stepper: MatStepper) {
        console.log(formData);
        this.http.get(
            AuthService.apiUrl+'?function=saveuserinfo&token='+this.authService.token,
          { headers: null, responseType: 'json', params: formData }
        ).subscribe(data => {
          console.log("returned",data);
          stepper.selected.completed = true;
          stepper.next();
        },
        error => {
          this.showToast("We konden de gegevens niet opslaan. Ben je nog verbonden?", 3000);
          console.log("error at data request", error);
        }
      );

    }

    start() {
      this.authService.firstUse = false;
      this.storage.set('firstUse', false);
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

    onChange(event, index, item) {
        item.checked = !item.checked;
    }

    stateForm: FormGroup = this._formBuilder.group({
        opleidingEnFaculteit:  new FormControl('', [Validators.required, this.validateFaculteit.bind(this)]),
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

}
