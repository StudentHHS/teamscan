import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
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

  // checken of form verstuur is
  verstuurd = false;
  verstuurdKnop = "Maak nieuw team"

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
      var chiplistinput = document.getElementById('chiplistinput');
      chiplistinput.addEventListener("keydown", function(e) {
        //console.log("hey",e);
      });
      var context = this;
      chiplistinput.addEventListener("textInput", function(e) {
        if ([",",";"," "].some(function(v) { return (<any>e).data.indexOf(v) >= 0; })) {
          e.preventDefault();
          console.log("send", e);
          context.add(e.srcElement);
      }
      });

      setTimeout(this.getOpleidingen.bind(this),200);
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
      this.showToast("We konden de data niet ophalen. Ben je nog verbonden?", 3000);
      console.log("error at data request", error);
    });
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

  add(event): void {
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

      event.value = '';

  }

  //Remove email
  remove( index) {
    this.getteamleden.removeAt(index);
    console.log(this.createTeamForm.value);
  }

  onChipKeypress(keycode) {
    console.log(keycode, SPACE);
    alert(keycode);
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
      this.verstuurd = true;
      this.verstuurdKnop = "Aanmaken..."
    }
  }

  stateGroups: OpleidingenGroup[];
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