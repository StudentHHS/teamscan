import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { BrowserModule } from '@angular/platform-browser';
// import { $ } from 'protractor';

@Component({
    selector: 'app-resultaten',
    templateUrl: './resultaten.component.html',
    styleUrls: []
})

// implements OnInit
export class ResultatenComponent {
    constructor() { }
    //   private http: HttpClient

    aantalUitgenodigd = 6;
    aantalRespondenten = 1;
    datumAangemaakt = "1 november 2019";
    datumVerlopen = "30 november 2019";
    dagenGeldig = "30 dagen";
    naamRespondent = "Jeremy Hut"
    inAfwachtingOp = [
        { naam: "Stan Ravensbergen" },
        { naam: "Charlie Vierling" },
        { naam: "Jeroen van Rossum" },
        { naam: "Desirée Lemans" },
        { naam: "Laura Lodewijk - Schmidt" }
    ];

}