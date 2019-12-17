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


    stateGroups: OpleidingenGroup[] = [{
        naam: 'Faculteit Business, Finance & Marketing',
        opleidingen: ['Boekhouden', 'IFMC - English Stream', 'Finance & Control - Associate Degree', 'Finance & control', 'Commerciële Economie', 'Internationale Zaken', 'Ondernemerschap & Retail Management', 'Kenniskring / Lectoraat', 'Faculteitsbureau'
        ]
      }, {
        naam: 'Faculteit Bestuur, Recht & Veiligheid',
        opleidingen: ['Bestuurskunde/Overheidsmanagement', 'IPM/Bestuurskunde/Overheidsmanagement - English Stream', 'Law (I&EL)/HBO-Rechten - English Stream', 'SSMS/Integrale Veiligheidskunde - English Stream', 'HBO-Rechten', 'Integrale Veiligheidskunde', 'Kenniskring / Lectoraat', 'Faculteitsbureau'
            ]
      }, {
        naam: 'Faculteit Gezondheid, Voeding & Sport',
        opleidingen: ['Mens en Techniek | Bewegingstechnologie', 'Opleiding tot Leraar Lichamelijke Opvoeding', 'Opleiding tot Verpleegkundige','Huidtherapie','Voeding & Diëtetiek','Sportkunde (International Sportmanagement)','Kenniskring / Lectoraat','Faculteitsbureau']
      }, {
        naam: 'Faculteit IT & Design',
        opleidingen: ['HBO-ICT - Den Haag','HBO-ICT - Delft','HBO-ICT - Zoetermeer','Communication and Multimedia Design','Kenniskring / Lectoraat','Faculteitsbureau']
      }, {
        naam: 'Faculteit Management & Organisatie',
        opleidingen: ['Bedrijfskunde','Communicatie','European Studies','Facilitaire Diensverlening','Personeelszaken','Kenniskring / Lectoraat','Faculteitsbureau']
      }, {
        naam: 'Faculteit Sociaal Werk & Educatie',
        opleidingen: ['Opleiding tot Leraar Basisonderwijs','Pedagogiek','Maatschappelijk Werk','Kenniskring / Lectoraat','Faculteitsbureau']
      }, {
        naam: 'Faculteit Technologie, Innovatie & Samenleving',
        opleidingen: ['Bouwkunde', 'IDE | Industrieel Product Ontwerpen - English Stream', 'PFT | Process & Food Technology','Civiele Techniek','Elektrotechniek','IPO | Industrieel Product Ontwerpen','Mechatronica','Ruimtelijke Ontwikkeling | Climate & Management','Technische Bedrijfskunde','Technische Natuurkunde','Toegepaste Wiskunde','Werktuigbouwkunde','Kenniskring / Lectoraat','Faculteitsbureau']
      }, {
        naam: 'Academie voor Masters & Professional Courses',
        opleidingen: []
      }, {
        naam: 'Bestuurszaken',
        opleidingen: []
      }, {
        naam: 'Dienst Bedrijfsvoering & Control',
        opleidingen: ['Dienstbureau','Eenheidsregeling','Eenheidsdiensten','Unit Subsidiedesk']
      }, {
        naam: 'Dienst Facilitaire Zaken & IT',
        opleidingen: ['Dienstbureau','Unit Facility Services & Huisvesting','Unit Frontoffice & Support','Unit Innovatie & Projecten','IT-Eenheid']
      }, {
        naam: 'Dienst Human Resources Management',
        opleidingen: ['Dienstbureau','Unit Strategie en HRD','Unit Advies en Dienstverlening']
      }, {
        naam: 'Dienst Onderwijs, Kennis & Communicatie',
        opleidingen: ['Dienstbureau','Eenheid Bibliotheek','Eenheid Onderwijs','Unit Studentenservice','Unit Wereldburgerschap & Internationalisering','Unit Marketing en Communicatie']
      }
    ];

    stateGroupOptions: Observable<OpleidingenGroup[]>;


    ngOnInit() {
        this.stateGroupOptions = this.stateForm.get('opleidingEnFaculteit')!.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterGroup(value))
          );
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
