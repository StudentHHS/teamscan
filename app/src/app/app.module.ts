import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TodoComponent } from './todo/todo.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { InvullenComponent } from './teams/team/invullen/invullen.component';
import { ResultatenComponent } from './teams/team/resultaten/resultaten.component';
import { UtilityService } from './utility.service';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';



@NgModule({
  declarations: [AppComponent, MenuComponent, LoginComponent, TodoComponent,
     TeamsComponent, TeamComponent, InvullenComponent, ResultatenComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule,
    BrowserAnimationsModule, MsalModule.forRoot({ clientID: OAuthSettings.appId, authority: "https://login.microsoftonline.com/a2586b9b-f867-4b3c-9363-5b435c5dbc45",}),
    MatButtonModule, MatSidenavModule, MatSidenavModule, MatToolbarModule, MatCardModule,
    MatGridListModule, MatMenuModule, MatIconModule, MatListModule,
    FormsModule,ReactiveFormsModule, MatRadioModule, MatTooltipModule, MatStepperModule,
    MatProgressSpinnerModule, HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilityService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
