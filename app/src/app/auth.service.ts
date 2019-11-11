import { Injectable } from '@angular/core';
import { MsalService, MsalModule } from '@azure/msal-angular';
import { Storage } from '@ionic/storage';

import { OAuthSettings } from '../oauth';
import { Client } from '@microsoft/microsoft-graph-client';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean = false;
  public firstUse: boolean = false;
  public user: any = null;
  public token: string;
  public MSALToken: string;
  private graphClient: Client;
  public redirectUri: string;

  constructor(
    private msalService: MsalService, private storage: Storage, private http: HttpClient,
    private toastController: ToastController) {
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(OAuthSettings.scopes, "app=true")
      .catch((reason) => {
        console.log('login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      // Temporary placeholder
      this.init(null);
      this.getMe()
      .then((user) => {
          console.log("userinfo", user);
          this.setUserLoggedIn(user);
      });
    }
  }

  // Sign out
  signOut(): void {
    //this.msalService.logout();
    this.user = null;
    this.authenticated = false;
    this.storage.clear();
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes)
      .catch((reason) => {
        console.log('Get token failed', JSON.stringify(reason, null, 2));
      });

    // Temporary to display token in an error box
    if (result) console.log('Token acquired', result);
    return result;
  }

    init(token: string) {
        if(token) {
            this.showToast("Inloggen...", 1000);
            this.MSALToken=token;
            this.graphClient = Client.init({
                authProvider: async (done) => {done(null, token)}
            });
        } else {
            this.graphClient = Client.init({
                authProvider: async (done) => {
                // Get the token from the auth service
                    let token = await this.getAccessToken()
                        .catch((reason) => {
                        done(reason, null);
                        });
                
                    if (token) {
                        this.MSALToken=token;
                        done(null, token);
                    } else {
                        done("Could not get an access token", null);
                    }
                }
            });
        }
    }

    async getMe(): Promise<Event[]> {
        try {
            let result =  await this.graphClient
            .api('/me')
            .get();

            return result;
        } catch (error) {
            console.log('Could not get user info', JSON.stringify(error, null, 2));
        }
    }

    async showToast(text: string, duration: number) {
      const toast = await this.toastController.create({
        message: text,
        duration: duration,
      });
      toast.present();
    }

    setUserLoggedIn(user: any) {
        console.log("set user", user);
        this.user = user;
        var context = this;
        this.getUserFromDatabase(function(data) {
          context.token=data.token;
          console.log("token from this", context.token);
          context.authenticated = true;
          context.firstUse = (data.opleiding == null) ? true : false;
          context.storage.set('firstUse', (data.opleiding == null) ? true : false);
          context.storage.set('authenticated', true);
          context.storage.set('user', JSON.stringify(user) );
          context.storage.set('token', data.token);
        });
    }

    getUserFromDatabase(func: any) {
      this.http.get(
          'https://teamscan.ga/api/?function=userregistration&token='+this.MSALToken,
          { headers: null, responseType: 'json' }
        ).subscribe(data => {
          console.log(data);
          func(data)
        },
        error => {
          this.showToast("Gebruikersgegevens konden niet worden opgehaald. Probeer het (later) opnieuw.", 3000);
          console.log("error at data request", error);
        }
      );
    }
}