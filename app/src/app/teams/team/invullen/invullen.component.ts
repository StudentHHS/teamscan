import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { BrowserModule } from '@angular/platform-browser';
// import { $ } from 'protractor';

@Component({
  selector: 'app-invullen',
  templateUrl: './invullen.component.html',
  styleUrls: []
})

// implements OnInit
export class InvullenComponent  {
  constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   // Simple GET request with response type <any>
  //   this.http.get(
  //     'https://teamscan.ga/api/?function=invullijst',
  //     { headers: new HttpHeaders({ Authorization: 'Bearer hoi' }), responseType: 'json' }
  //   ).subscribe(data => {
  //     console.log("resultaat");
  //     console.log(data);
  //   })
  // }
  question1 : String;
  // title = "Kwaliteit van het werk";

  // questions = [
  //         { value: 'fase1', text: 'Kwaliteit kan onderling sterk verschillen. ', tooltip: 'Kwaliteit kan sterk verschillen per medewerker en is afhankelijk van diens persoonlijke opvattingen en competenties.'},
  //         { value: 'fase2', text: 'Taken worden op elkaar afgestemd.', tooltip: 'Medewerkers stemmen binnen het team taken op elkaar af.'},
  //         { value: 'fase3', text: 'Er wordt onderling feedback gegeven en gecoacht.', tooltip: 'Medewerkers coachen elkaar en geven elkaar feedback op hun taken conform gestelde doelen.'},
  //         { value: 'fase4', text: 'Feedback wordt gebruikt om de kwaliteit te verhogen.', tooltip: 'Team organiseert feedback van belanghebbenden en gebruikt dit om de kwaliteit van het werk te verhogen.'}
  //       ];


  titleS1 = "Kwaliteit van het werk";
  antwoordenS1 = [{
    "id": 1,
    "antwoord": "Kwaliteit kan sterk verschillen per medewerker en is afhankelijk van diens persoonlijke opvattingen en competenties.",
    "dimensie_id": 1,
    "fase_id": 1,
    "categorie": "Kwaliteit van het werk"
  },
  {
    "id": 1,
    "antwoord": "Medewerkers stemmen binnen het team taken op elkaar af.",
    "dimensie_id": 1,
    "fase_id": 2,
    "categorie": "Kwaliteit van het werk"
  },
  {
    "id": 1,
    "antwoord": "Medewerkers coachen elkaar en geven elkaar feedback op hun taken conform gestelde doelen.",
    "dimensie_id": 1,
    "fase_id": 3,
    "categorie": "Kwaliteit van het werk"
  },
  {
    "id": 1,
    "antwoord": "Team organiseert feedback van belanghebbenden en gebruikt dit om de kwaliteit van het werk te verhogen.",
    "dimensie_id": 1,
    "fase_id": 4,
    "categorie": "Kwaliteit van het werk"
  }
  ];

  titleS2 = "Verdeling werkzaamheden";
  antwoordenS2 = [{
    "id": 2,
    "antwoord": "Werkzaamheden worden vooral verdeeld door manager en/of roosteraar, waarbij rekening wordt gehouden met individuele wensen.",
    "dimensie_id": 2,
    "fase_id": 1,
    "categorie": "Verdeling werkzaamheden"
  },
  {
    "id": 2,
    "antwoord": "Collegas hebben onderling overleg over de verdeling van de werkzaamheden; uiteindelijk worden deze verdeeld door manager en/of roosteraar.",
    "dimensie_id": 2,
    "fase_id": 2,
    "categorie": "Verdeling werkzaamheden"
  },
  {
    "id": 2,
    "antwoord": "Werkzaamheden worden in principe verdeeld binnen het team; meningsverschillen worden beslecht door de manager.",
    "dimensie_id": 2,
    "fase_id": 3,
    "categorie": "Verdeling werkzaamheden"
  },
  {
    "id": 2,
    "antwoord": "Werkzaamheden worden verdeeld door en binnen het team, rekening houdend met de beschikbare middelen.",
    "dimensie_id": 2,
    "fase_id": 4,
    "categorie": "Verdeling werkzaamheden"
  }
  ];

  titleS3 = "Regeltaken";
  antwoordenS3 = [{
    "id": 3,
    "antwoord": "Regeltaken die het team aangaan, worden in niet meer dan 20% door het team verricht (en meestal door een manager).",
    "dimensie_id": 3,
    "fase_id": 1,
    "categorie": "Regeltaken"
  },
  {
    "id": 3,
    "antwoord": "Regeltaken die het team aangaan, worden meestal door het team verricht.",
    "dimensie_id": 3,
    "fase_id": 2,
    "categorie": "Regeltaken"
  },
  {
    "id": 3,
    "antwoord": "Teamleden geven elkaar feedback en coachen elkaar met betrekking tot regeltaken.",
    "dimensie_id": 3,
    "fase_id": 3,
    "categorie": "Regeltaken"
  },
  {
    "id": 3,
    "antwoord": "Het team onderhandelt zelf met andere teams van binnen en buiten de eigen organisatie over regeltaken.",
    "dimensie_id": 3,
    "fase_id": 4,
    "categorie": "Regeltaken"
  }
  ];

  titleS4 = "Teamoverleg";
  antwoordenS4 = [{
    "id": 4,
    "antwoord": "Manager zorgt voor regelmatig teamoverleg.",
    "dimensie_id": 4,
    "fase_id": 1,
    "categorie": "Teamoverleg"
  },
  {
    "id": 4,
    "antwoord": "Team zorgt zelf oor teamoverleg.",
    "dimensie_id": 4,
    "fase_id": 2,
    "categorie": "Teamoverleg"
  },
  {
    "id": 4,
    "antwoord": "Team verbetert het teamoverleg.",
    "dimensie_id": 4,
    "fase_id": 3,
    "categorie": "Teamoverleg"
  },
  {
    "id": 4,
    "antwoord": "Team organiseert het overleg met individuen en andere teams van binnen en buiten de organisatie.",
    "dimensie_id": 4,
    "fase_id": 4,
    "categorie": "Teamoverleg"
  }
  ];

  titleS5 = "Besluitvorming";
  antwoordenS5 = [{
    "id": 5,
    "antwoord": "Besluitvorming ligt grotendeels bij de manager.",
    "dimensie_id": 5,
    "fase_id": 1,
    "categorie": "Besluitvorming"
  },
  {
    "id": 5,
    "antwoord": "Teamleden doen actief mee in besluitvorming.",
    "dimensie_id": 5,
    "fase_id": 2,
    "categorie": "Besluitvorming"
  },
  {
    "id": 5,
    "antwoord": "Besluiten worden door het team zelfstandig genomen, geëvalueerd en aangepast.",
    "dimensie_id": 5,
    "fase_id": 3,
    "categorie": "Besluitvorming"
  },
  {
    "id": 5,
    "antwoord": "Team beslist zelfstandig over noodzakelijke verbetereingen in de samenwerking met externen.",
    "dimensie_id": 5,
    "fase_id": 4,
    "categorie": "Besluitvorming"
  }
  ];

  titleS6 = "Onderlinge relaties";
  antwoordenS6 = [{
    "id": 6,
    "antwoord": "Rollen en taakverdeling binnen het team zijn duidelijk; teamspelregels (hoe gaan we met elkaar om) zij nog vaag.",
    "dimensie_id": 6,
    "fase_id": 1,
    "categorie": "Onderlinge relaties"
  },
  {
    "id": 6,
    "antwoord": "Rollen en taakverdeling rouleren onder teamleden; teamspelregels zijn duidelijk en worden door allen onderschreven.",
    "dimensie_id": 6,
    "fase_id": 2,
    "categorie": "Onderlinge relaties"
  },
  {
    "id": 6,
    "antwoord": "Teamleden spreken elkaar aan op ongewenst gedrag; teamleden kennen en benutten elkaars kwaliteiten.",
    "dimensie_id": 6,
    "fase_id": 3,
    "categorie": "Onderlinge relaties"
  },
  {
    "id": 6,
    "antwoord": "Teamleden kennen en benutten de kwaliteiten van de omgeving (zowel binnen als buiten het team).",
    "dimensie_id": 6,
    "fase_id": 4,
    "categorie": "Onderlinge relaties"
  }
  ];

  titleS7 = "Conflicthantering";
  antwoordenS7 = [{
    "id": 7,
    "antwoord": "Conflicten en problemen worden met de manager besroken, de manager heeft een leidende rol bij de oplossing.",
    "dimensie_id": 7,
    "fase_id": 1,
    "categorie": "Conflicthantering"
  },
  {
    "id": 7,
    "antwoord": "Conflicten en problemen worden met de manager besproken, conflicten worden gezamenlijk opgelost.",
    "dimensie_id": 7,
    "fase_id": 2,
    "categorie": "Conflicthantering"
  },
  {
    "id": 7,
    "antwoord": "Onderlige conflicten worden door het team zelf opgelost.",
    "dimensie_id": 7,
    "fase_id": 3,
    "categorie": "Conflicthantering"
  },
  {
    "id": 7,
    "antwoord": "Team lost problemen en conflicten met de omgeving zelfstandig op.",
    "dimensie_id": 7,
    "fase_id": 4,
    "categorie": "Conflicthantering"
  }
  ];

  titleS8 = "Doelgerichtheid";
  antwoordenS8 = [{
    "id": 8,
    "antwoord": "Manager maakt teamplan, teamplan is bekend bij en wordt uitgevoerd door het team.",
    "dimensie_id": 8,
    "fase_id": 1,
    "categorie": "Doelgerichtheid"
  },
  {
    "id": 8,
    "antwoord": "Manager maakt teamplan en vraagt team advies bij het maken van dit plan.",
    "dimensie_id": 8,
    "fase_id": 2,
    "categorie": "Doelgerichtheid"
  },
  {
    "id": 8,
    "antwoord": "Teamplan, doelen en normen worden door manager in overleg met team vastgesteld.",
    "dimensie_id": 8,
    "fase_id": 3,
    "categorie": "Doelgerichtheid"
  },
  {
    "id": 8,
    "antwoord": "Team vertaalt doelen en wensen van teamleden en beroepenveld naar doelstellingen en maakt deze operationeel in teamplan.",
    "dimensie_id": 8,
    "fase_id": 4,
    "categorie": "Doelgerichtheid"
  }
  ];

  titleS9 = "Prestatiegerichtheid";
  antwoordenS9 = [{
    "id": 9,
    "antwoord": "Teamresultaten worden aan het team teruggekoppeld door manager.",
    "dimensie_id": 9,
    "fase_id": 1,
    "categorie": "Prestatiegerichtheid"
  },
  {
    "id": 9,
    "antwoord": "Team evalueert en beoordeelt de resultaten met de manager en komt zo nodig met verbetervoorstellen.",
    "dimensie_id": 9,
    "fase_id": 2,
    "categorie": "Prestatiegerichtheid"
  },
  {
    "id": 9,
    "antwoord": "Team evalueert en beoordeelt de resultaten zelfstandig en komt zo nodig met vebetervoorstellen. Team kan bereikte prestatieniveau vasthouden.",
    "dimensie_id": 9,
    "fase_id": 3,
    "categorie": "Prestatiegerichtheid"
  },
  {
    "id": 9,
    "antwoord": "Team verbetert zijn prestatieniveau continu; team kenmerkt zich door ondernemerschap.",
    "dimensie_id": 9,
    "fase_id": 4,
    "categorie": "Prestatiegerichtheid"
  }
  ];

  titleS10 = "Competentieontwikkeling (van team en medewerkers)";
  antwoordenS10 = [{
    "id": 10,
    "antwoord": "Manager bepaalt aan welke individuele en teamcompetenties gewerkt moet worden.",
    "dimensie_id": 10,
    "fase_id": 1,
    "categorie": "Competentieontwikkeling (van team en medewerkers)"
  },
  {
    "id": 10,
    "antwoord": "Manager en team bepalen gezamenlijk aan welke individuele en teamcompetenties gewerkt moet worden.",
    "dimensie_id": 10,
    "fase_id": 2,
    "categorie": "Competentieontwikkeling (van team en medewerkers)"
  },
  {
    "id": 10,
    "antwoord": "Team bepaalt aan welke individuele en teamcompetenties gewerkt moet worden.",
    "dimensie_id": 10,
    "fase_id": 3,
    "categorie": "Competentieontwikkeling (van team en medewerkers)"
  },
  {
    "id": 10,
    "antwoord": "Omgeving heeft invloed op de keuzes van het team m.b.t. individuele en teamontwikkeling.",
    "dimensie_id": 10,
    "fase_id": 4,
    "categorie": "Competentieontwikkeling (van team en medewerkers)"
  }
  ];

  titleS11 = "Niveaus van leren";
  antwoordenS11 = [{
    "id": 11,
    "antwoord": "Team is in staat dagelijkse werkproblemen op te lossen.",
    "dimensie_id": 11,
    "fase_id": 1,
    "categorie": "Niveaus van leren"
  },
  {
    "id": 11,
    "antwoord": "Team gaat bij ehet oplossen van werkproblemen dieper in op de oorzaak en reflecteert op eerdere ervaringen.",
    "dimensie_id": 11,
    "fase_id": 2,
    "categorie": "Niveaus van leren"
  },
  {
    "id": 11,
    "antwoord": "Team leert bij het oplossen van werkproblemen beuwst van fouten uit het heden en verleden.",
    "dimensie_id": 11,
    "fase_id": 3,
    "categorie": "Niveaus van leren"
  },
  {
    "id": 11,
    "antwoord": "Team expliciteert het leren en deelt met teamleden en omgeving.",
    "dimensie_id": 11,
    "fase_id": 4,
    "categorie": "Niveaus van leren"
  }
  ];

  titleS12 = "Management informatie (waaronder financiën)";
  antwoordenS12 = [{
    "id": 12,
    "antwoord": "Team heeft geen zicht op de prestaties van de organisatie en ontvangt hierover geen management-informatie.",
    "dimensie_id": 12,
    "fase_id": 1,
    "categorie": "Management informatie (waaronder financiën)"
  },
  {
    "id": 12,
    "antwoord": "Team wordt periodiek door de manager geïnformeerd over de realisatie van de doelstellingen.",
    "dimensie_id": 12,
    "fase_id": 2,
    "categorie": "Management informatie (waaronder financiën)"
  },
  {
    "id": 12,
    "antwoord": "Team ontvangt relevante management-informatie en kan (zij het in beperkte mate) invloed uitoefenen op het behalen van de doelstellingen.",
    "dimensie_id": 12,
    "fase_id": 3,
    "categorie": "Management informatie (waaronder financiën)"
  },
  {
    "id": 12,
    "antwoord": "Team ontvangt ontvangt een budget dat het volledig naar eigen inzicht in kan zetten en verantwoordt zich hier periodiek over.",
    "dimensie_id": 12,
    "fase_id": 4,
    "categorie": "Management informatie (waaronder financiën)"
  }
  ];
}

