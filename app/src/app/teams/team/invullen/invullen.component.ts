import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { BrowserModule } from '@angular/platform-browser';
// import { $ } from 'protractor';

@Component({
  selector: 'app-invullen',
  templateUrl: './invullen.component.html',
  styleUrls: []
})

export class InvullenComponent implements OnInit{
  constructor(private http: HttpClient) {}

  result: Array<Object>;

  ngOnInit() {      
    // Simple GET request with response type <any>
    this.http.get<any>('https://teamscan.ga/api').subscribe(data => {
        console.log("Dit krijg je terug, lul" + data);
    })
}

  // question1 : String;
  // title = "Kwaliteit van het werk";

  // questions = [
  //         { value: 'fase1', text: 'Kwaliteit kan onderling sterk verschillen. ', tooltip: 'Kwaliteit kan sterk verschillen per medewerker en is afhankelijk van diens persoonlijke opvattingen en competenties.'},
  //         { value: 'fase2', text: 'Taken worden op elkaar afgestemd.', tooltip: 'Medewerkers stemmen binnen het team taken op elkaar af.'},
  //         { value: 'fase3', text: 'Er wordt onderling feedback gegeven en gecoacht.', tooltip: 'Medewerkers coachen elkaar en geven elkaar feedback op hun taken conform gestelde doelen.'},
  //         { value: 'fase4', text: 'Feedback wordt gebruikt om de kwaliteit te verhogen.', tooltip: 'Team organiseert feedback van belanghebbenden en gebruikt dit om de kwaliteit van het werk te verhogen.'}
  //       ];
}
