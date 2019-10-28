import { Injectable } from '@angular/core';
import { MsalService, MsalModule } from '@azure/msal-angular';
import { Storage } from '@ionic/storage';

import { OAuthSettings } from '../oauth';
import { Client } from '@microsoft/microsoft-graph-client';
import { IdToken } from 'msal/lib-commonjs/IdToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public user: any;
  private graphClient: Client;
  public redirectUri: string;

  constructor(
    private msalService: MsalService, private storage: Storage) {
    this.authenticated = false;
    this.user = null;
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(OAuthSettings.scopes)
      .catch((reason) => {
        console.log('login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
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

    setUserLoggedIn(user: any) {
        console.log("set user", user);
        this.storage.set('authenticated', true);
        this.user = user;
        this.authenticated = true;
        this.storage.set('user', JSON.stringify(user) );
    }
}