import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./../../menu/menu.component.css','./../teams.component.css', './createteam.component.css']
})

export class CreateTeamComponent implements OnInit {
  @ViewChild('chipList', { static: true }) chipList: MatChipList;
  private createTeamForm: FormGroup;
  private http: HttpClient;

  // email chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(private fb: FormBuilder) {
    this.createTeamForm = this.fb.group({
      naam: ['', Validators.required],
      beschrijving: ['', Validators.required],
      emails: this.fb.array([], this.validateArrayNotEmpty)
    });
  }

  ngOnInit() {
    this.createTeamForm.get('emails').statusChanges.subscribe(
      status => this.chipList.errorState = status === 'INVALID'
    );
  }

  initEmail(email: string): FormControl {
    return this.fb.control(email);
  }

  //Check of er minimaal 2 emails zijn ingevuld.
  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length <= 1) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  //Check of het echt een email is.
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  add(event: MatChipInputEvent, form: FormGroup): void {
    const input = event.input;
    const value = event.value;

    // Add email
    if ((value || '').trim()) {
      const control = <FormArray>form.get('emails');
      if(this.validateEmail(value)) {
        control.push(this.initEmail(value.trim()));
      }
      else {
        return null;
      }
      console.log(control);
      console.log(this.createTeamForm.value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  //Remove email
  remove(form, index) {
    console.log(form);
    form.get('emails').removeAt(index);
    console.log(this.createTeamForm.value);
  }

  onSubmit(formData: any){
    console.log(formData);
    this.http.get(
      'https://teamscan.ga/api/?function=createnewteam',
      { headers: null, responseType: 'json', params: formData })
      .subscribe(data => {
        console.log("send",data)
      });
  }
}