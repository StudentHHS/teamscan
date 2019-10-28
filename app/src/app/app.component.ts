import { Component} from '@angular/core';
import { Location } from '@angular/common';
import { fadeAnimation } from './animations';
import { Storage } from '@ionic/storage'

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeAnimation],
  host: {'(window:url-intent-event)':'receivedIntent($event)'}
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private location: Location,
    private us: UtilityService,
    private router: Router,
    private storage: Storage,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      //this.statusBar.backgroundColorByHexString("#71a437");
      this.splashScreen.hide();

    });
    console.log("check if authenticated");
    this.storage.get('authenticated').then((val: string) => {
      if (val == null) {} else {
        console.log('from storage authenticated', val);
        this.authService.authenticated=true;
      }
    });
    this.storage.get('user').then((val: string) => {
      if (val == null) {} else {
        console.log('from storage user', val);
        this.authService.user=JSON.parse(val);
      }
    });
  }

  receivedIntent($event) {
    let token = $event.detail.match('[#&]access_token=([^&]+)')[1];
    this.authService.init(token);
    this.authService.getMe()
    .then((user) => {
        console.log("got user", user);
        this.authService.setUserLoggedIn(user);
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }
}
