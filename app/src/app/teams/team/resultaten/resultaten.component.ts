import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-resultaten',
    templateUrl: './resultaten.component.html',
    styleUrls: ['./resultaten.component.css']
})

export class ResultatenComponent {
    @ViewChild('graphChart', null) graphChart;

    bars: any;
    colorArray: any;
    constructor() { }

    aantalKeerGekozen = 1;
    aantalUitgenodigd = 6;
    aantalRespondenten = 1;
    aantalInAfwachting = this.aantalUitgenodigd - this.aantalRespondenten;
    team = 'Team 1 - HBO-ICT'

    vandaag = moment();
    datumAangemaakt = moment("20191101", "YYYYMMDD");
    datumVerlopen = moment("20191130", "YYYYMMDD");
    dagenGeldig = (this.datumVerlopen.diff(this.datumAangemaakt, "days"));
    verlopenPeriode = ((this.dagenGeldig) - (this.datumVerlopen.diff(this.vandaag, "days")));
    resterendeDagen = (this.datumVerlopen.diff(this.vandaag, "days"))

    dagenGeldigProgressieBar = (this.verlopenPeriode / this.dagenGeldig) * 100;

    naamRespondent = "Jeremy Hut"
    inAfwachtingOp = [
        { naam: "Stan Ravensbergen" },
        { naam: "Charlie Vierling" },
        { naam: "Jeroen van Rossum" },
        { naam: "Desirée Lemans" },
        { naam: "Laura Lodewijk - Schmidt" }
    ];

    antwoord1 = "Als we een sterker team willen vormen moet de communicatie beter gaan verlopen.";
    antwoord2 = "Als we een hechter team willen worden, dan moet er van meerdere collega's input komen wanneer er verkeerd gehandeld wordt zodat we dit kunnen aanpakken.";
    antwoord3 = "Wanneer er meerdere uitjes worden gehouden per jaar zullen wij een sterker teamsverband creëeren";

    max = this.dagenGeldig;
    current = this.verlopenPeriode;

    public barChartData: Array<any> = [
        { data: [this.aantalRespondenten], label: 'Aantal respondenten', stack: 'a' },
        { data: [this.aantalInAfwachting], label: 'Aantal in afwachting', stack: 'a' }
    ];
    public barChartLabels: Array<any> = ['Aantal uitgenodigd'];
    public barChartOptions: any = {
        responsive: true
    };
    public barChartColors: Array<any> = [
        { // green
            backgroundColor: '#9ea700',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        // { // grey
        //     backgroundColor: 'rgba(148,159,177,0.2)',
        //     borderColor: 'rgba(148,159,177,1)',
        //     pointBackgroundColor: 'rgba(148,159,177,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        // }
    ];
    public barChartLegend: boolean = true;
    public barChartType: string = 'bar';
}