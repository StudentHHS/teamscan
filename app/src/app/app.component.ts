import { Component} from '@angular/core';
import { Location } from '@angular/common';
import { fadeAnimation } from './animations';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private location: Location,
    private us: UtilityService
  ) {
    this.initializeApp();/*
    this.render.listen('document', 'backbutton', ()=>{
      this.backButtonEvent();
    });*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      //this.statusBar.backgroundColorByHexString("#71a437");
      this.splashScreen.hide();
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }
}
