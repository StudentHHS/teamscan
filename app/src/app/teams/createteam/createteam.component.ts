import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {}

  createTeamForm: FormGroup = this.fb.group({
    naam: ['', Validators.required],
    beschrijving: ['', Validators.required],
    teamleider: ['', Validators.required],
    teamleden: new FormArray([], [this.validateArrayNotEmpty])
  });

  get getteamleden() {
    return this.createTeamForm.get('teamleden') as FormArray;
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

  onSubmit(formData: any){
    console.log(formData);
    if(this.createTeamForm.valid){
    this.http.get(
      'https://teamscan.ga/api/?function=createnewteam&token='+this.authService.token,
      { headers: null, responseType: 'json', params: formData })
      .subscribe(data => {
        console.log("send",data)
      });
    }
  }
}