import { Component} from '@angular/core';
import { Location } from '@angular/common';
import { fadeAnimation } from './animations';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'Teamscan';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
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
    this.router
    .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;
        if (child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return this.title;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(ttl);
      this.title = ttl;
      console.log("change title");
    });
  }
}