import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';
import { AuthService } from 'src/app/auth.service';
import { ToastController } from '@ionic/angular';
import { trigger, transition, animate, style, group } from '@angular/animations'
import { delay } from 'q';

@Component({
    selector: 'app-resultaten',
    templateUrl: './resultaten.component.html',
    styleUrls: ['./resultaten.component.css'],
    animations: [
        trigger('grow', [
            transition(':enter', [
                style({ height: '0', opacity: 0 }),
                group([
                    animate("200ms cubic-bezier(0,.97,.53,1)", style({ height: '*' })),
                    animate('400ms ease-out', style({ 'opacity': '1' }))
                ])
            ])
        ])
    ]
})

export class ResultatenComponent {
    public id: string;
    public teamscan: string;
    requestFailed: Boolean = false;
    public resultdata: any = null;
    public objectKeys = Object.keys;
    public avgRounded = 0;

    public themas = [{ naam: "Kwaliteit van werk", beschrijving: "vergroten individuele competenties en versterken van inzetbaarheid op uitvoerende taken van teamleden.", dimensies: [1], gemiddelde: null },
    { naam: "Organiseren", beschrijving: "vergroten zelfstandigheid door regeltaken in team te beleggen. Items zijn verdeling werkzaamheden, regeltaken, teamoverleg en competentieontwikkelingen.", dimensies: [2, 3, 4, 10], gemiddelde: null },
    { naam: "Samenwerken", beschrijving: "verbeteren onderlinge betrekkingen en besluitvorming. Items zijn besluitvorming, onderlinge relaties, niveaus van leren en conflicthantering.", dimensies: [5, 6, 7, 11], gemiddelde: null },
    { naam: "Ondernemen", beschrijving: "vergroten prestatiegerichtheid, doelgerichtheid en het voorzien zijn van (financiële) managementinformatie.", dimensies: [8, 9, 12], gemiddelde: null }];

    constructor(
        private route: ActivatedRoute,
        private us: UtilityService,
        private http: HttpClient,
        private authService: AuthService,
        private toastController: ToastController) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.teamscan = this.route.snapshot.paramMap.get('scan');
        this.getData();
    }

    getData() {
        if (this.authService.token) {
            this.http.get(
                AuthService.apiUrl,
                { headers: { Authorization: "Bearer " + this.authService.token }, responseType: 'json', params: { teamid: this.id, teamscanid: this.teamscan, function: "getresults" } }
            ).subscribe(data => {
                console.log("resultaat");
                console.log(data);
                console.log(data["lijst"]["1"]);
                this.requestFailed = false;
                this.resultdata = data;
                this.avgRounded = Math.round(data["gemiddelde"]);

                for (let thema of this.themas) {
                    var fases = { 1: 0, 2: 0, 3: 0, 4: 0 };
                    for (let dimensie of thema.dimensies) {
                        fases[1] += this.resultdata.lijst[dimensie][1].aantal
                        fases[2] += this.resultdata.lijst[dimensie][2].aantal
                        fases[3] += this.resultdata.lijst[dimensie][3].aantal
                        fases[4] += this.resultdata.lijst[dimensie][4].aantal
                    }

                    var keys = Object.keys(fases);
                    var largest = Math.max.apply(null, keys.map(x => fases[x]))
                    var result = keys.reduce((result, key) => {
                        if (fases[key] === largest) {
                            result.push(key);
                        }
                        return result;
                    }, []);

                    console.log("nfjksadnjasdnas:", result)

                    var gemiddelde = 0;
                    for(let getal of result){
                        gemiddelde += +getal;
                    }
                    thema.gemiddelde = gemiddelde / result.length;
                }

                console.log("njkdsajkdhasjkdhjasmjdlsadhasjkbdkjsahdjksbjd", this.themas)


            },
                error => {
                    this.showToast("De gegevens konden niet worden ingeladen. Ben je nog verbonden?", 3000);
                    this.requestFailed = true;
                    console.log("error at data request", error);
                }
            );
        } else {
            setTimeout(this.getData.bind(this), 100);
        }
    }

    reload() {
        this.getData();
        this.requestFailed = false;
    }

    async showToast(text: string, duration: number) {
        const toast = await this.toastController.create({
            message: text,
            duration: duration,
        });
        toast.present();
    }

    //   Oude content voor de ts file
    @ViewChild('graphChart', null) graphChart;

    bars: any;
    colorArray: any;

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