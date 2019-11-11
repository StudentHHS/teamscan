import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./../../menu/menu.component.css','./../teams.component.css', './createteam.component.css']
})

export class CreateTeamComponent implements OnInit {
  @ViewChild('chipList', { static: true }) chipList: MatChipList;
  public myForm: FormGroup;

  // email chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // data
  team = {
    naam: ['', Validators.required],
    beschrijving: ['', Validators.required],
    emails: []
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      naam: this.team.naam,
      beschrijving: this.team.beschrijving,
      emails: this.fb.array(this.team.emails, this.validateArrayNotEmpty)
    });
  }

  ngOnInit() {
    this.myForm.get('emails').statusChanges.subscribe(
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
      console.log(this.myForm.value);
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
    console.log(this.myForm.value);
  }

  onSubmit(){
    console.log(this.myForm.value)
  }
}