import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface OpleidingenGroup {
  naam: string;
  opleidingen: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) >= 0);
};

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./../../menu/menu.component.css','./../teams.component.css', './createteam.component.css']
})

export class CreateTeamComponent {
  @ViewChild('chipList', { static: true }) chipList: MatChipList;

  // email chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public invalidEmailInput:Boolean = false;

  constructor(private fb: FormBuilder, private location: Location, private authService: AuthService, private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.createTeamForm.get('samenwerking').valueChanges
      .subscribe(value => {
        console.log(value);
        if (value === '1') {
          this.createTeamForm.removeControl("opleidingEnFaculteit");
        } else {
          this.createTeamForm.addControl("opleidingEnFaculteit", new FormControl('', [Validators.required]));
        }
      });
    this.stateGroupOptions = this.createTeamForm.get('opleidingEnFaculteit')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  createTeamForm: FormGroup = this.fb.group({
    naam: ['', Validators.required],
    beschrijving: ['', Validators.required],
    samenwerking: ['0',Validators.required],
    opleidingEnFaculteit: '',
    teamleden: new FormArray([], [this.validateArrayNotEmpty])
  });

  get getteamleden() {
    return this.createTeamForm.get('teamleden') as FormArray;
  }


  isValidUser(c: FormControl) : Promise<any> {
    return  new Promise<any>(
      (resolve, reject) => {
      if(this.validateEmail(c.value)) {
        this.http.get(
            AuthService.apiUrl+'?function=getuseridbymail&token='+this.authService.token,
          { headers: null, responseType: 'json', params: {mail: c.value} }
        ).subscribe((data) => {
          resolve(null);
        },
        error => {
          if(error.status == 404) {
            resolve({isValidUser: { valid: false } });
          } else {
            this.showToast("Verifiëren is eventjes niet gelukt", 1000);
            console.log("error at data request", error);
            reject();
          }
        });
      } else {
        resolve({isValidUser: { valid: false } });
      }
  });
    ///if (c.value !== "jhut")
    //  return {isValidUser: { valid: false } };
    //return null;
  }

  //Check of er minimaal 2 emails zijn ingevuld.
  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length <= 1)
      return {validateArrayNotEmpty: { valid: false } };
    return null;
  }

  //Check of het echt een email is.
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add email
    if ((value || '').trim()) {
      if(this.validateEmail(value)) {
        this.invalidEmailInput=false;
        this.getteamleden.push(new FormControl(value));
      }
      else {
        this.invalidEmailInput=true;
        return null;
      }
      console.log(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  //Remove email
  remove( index) {
    this.getteamleden.removeAt(index);
    console.log(this.createTeamForm.value);
  }

  async showToast(text: string, duration: number) {
    const toast = await this.toastController.create({
      message: text,
      duration: duration,
    });
    toast.present();
  }

  onSubmit(formData: any){
    console.log(formData);
    formData.teamledenstring = formData.teamleden.toString();
    if(this.createTeamForm.valid){
    this.http.get(
        AuthService.apiUrl+'?function=createnewteam&token='+this.authService.token,
      { headers: null, responseType: 'json', params: formData })
      .subscribe(data => {
        console.log("send",data)
        this.location.back();
      });
    }
  }

  stateGroups: OpleidingenGroup[] = [{
    naam: 'Faculteit Business, Finance & Marketing',
    opleidingen: ['Accountancy', 'Finance & control', 'Commerciële Economie', 'International Business', 'Ondernemerschap & Retail Management', 'Kenniskring / Lectoraat', 'Faculteitsbureau'
    ]
  }, {
    naam: 'Faculteit Bestuur, Recht & Veiligheid',
    opleidingen: ['Bestuurskunde/Overheidsmanagement', 'HBO-Rechten', 'Integrale Veiligheidskunde', 'Kenniskring / Lectoraat', 'Faculteitsbureau'
        ]
  }, {
    naam: 'Faculteit Gezondheid, Voeding & Sport',
    opleidingen: ['Mens en Techniek | Bewegingstechnologie', 'Opleiding tot Leraar Lichamelijke Opvoeding', 'Opleiding tot Verpleegkundige','Huidtherapie','Voeding & Diëtetiek','Sportkunde (International Sportmanagement)','Kenniskring / Lectoraat','Faculteitsbureau']
  }, {
    naam: 'Faculteit IT & Design',
    opleidingen: ['HBO-ICT - Den Haag','HBO-ICT - Delft','HBO-ICT - Zoetermeer','Communication and Multimedia Design','Kenniskring / Lectoraat','Faculteitsbureau']
  }, {
    naam: 'Faculteit Management & Organisatie',
    opleidingen: ['Bedrijfskunde','Communicatie','European Studies','Facility Management','Human Resource Management','Kenniskring / Lectoraat','Faculteitsbureau']
  }, {
    naam: 'Faculteit Sociaal Werk & Educatie',
    opleidingen: ['Opleiding tot Leraar Basisonderwijs','Pedagogiek','Social Work','Kenniskring / Lectoraat','Faculteitsbureau']
  }, {
    naam: 'Faculteit Technologie, Innovatie & Samenleving',
    opleidingen: ['Bouwkunde','PFT | Process & Food Technology','Civiele Techniek','Elektrotechniek','IPO | Industrieel Product Ontwerpen','Mechatronica','Ruimtelijke Ontwikkeling | Climate & Management','Technische Bedrijfskunde','Technische Natuurkunde','Toegepaste Wiskunde','Werktuigbouwkunde','Kenniskring / Lectoraat','Faculteitsbureau']
  }, {
    naam: 'Academie voor Masters & Professional Courses',
    opleidingen: []
  }, {
    naam: 'Bestuurszaken',
    opleidingen: []
  }, {
    naam: 'Dienst Bedrijfsvoering & Control',
    opleidingen: ['Dienstbureau','Unit Control','Unit Services','Unit Subsidiedesk']
  }, {
    naam: 'Dienst Facilitaire Zaken & IT',
    opleidingen: ['Dienstbureau','Unit Facility Services & Huisvesting','Unit Frontoffice & Support','Unit Innovatie & Projecten','Unit IT & Educational Services']
  }, {
    naam: 'Dienst Human Resources Management',
    opleidingen: ['Dienstbureau','Unit Strategie en HRD','Unit Advies en Dienstverlening']
  }, {
    naam: 'Dienst Onderwijs, Kennis & Communicatie',
    opleidingen: ['Dienstbureau','Unit Bibliotheek','Unit Onderwijs & Onderzoek','Unit Studentenservice','Unit Wereldburgerschap & Internationalisering','Unit Marketing en Communicatie']
  }
];

stateGroupOptions: Observable<OpleidingenGroup[]>;

private _filterGroup(value: string): OpleidingenGroup[] {
    if (value) {
        return this.stateGroups
        .map(group => ({naam: group.naam, opleidingen: _filter(group.opleidingen, value)}))
        .filter(group => group.opleidingen.length > 0);
    }

    return this.stateGroups;
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
}