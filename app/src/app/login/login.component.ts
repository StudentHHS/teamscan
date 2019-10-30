import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Platform } from '@ionic/angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { OAuthSettings } from 'src/oauth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})

export class LoginComponent {
    private graphClient: Client;
  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService,
    private platform: Platform) {
        console.log("user",authService.user);
    }

    async loginButton(): Promise<void> {
        if(this.platform.is('cordova') ) {
            window.open('https://login.microsoftonline.com/a2586b9b-f867-4b3c-9363-5b435c5dbc45/oauth2/v2.0/authorize\
?response_type=id_token+token\
&scope=user.read%20openid%20profile\
&client_id='+encodeURI(OAuthSettings.appId)+'\
&redirect_uri=teamscan%3A%2F%2Foauth2&state=566c4ca0-4a35-4ec9-a753-64a69b2c17b6\
&nonce=b3525a1f-1918-477c-a089-b8f2f968c79c\
&client_info=1\
&x-client-SKU=MSAL.JS\
&x-client-Ver=0.2.1\
&client-request-id=30e04d29-b665-4738-952a-ec1a280c3bdb\
&prompt=select_account\
&response_mode=fragment');
        } else {
            await this.authService.signIn();
        }
    }
  //loginButton() {
      //console.log("set");
        //this.storage.set('userid', '16080203');
        //this.storage.remove('userid');
        //this.router.navigateByUrl('');
  //}
}
