import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TodoComponent } from './todo/todo.component';
import { TeamsComponent } from './teams/teams.component';
import { CreateTeamComponent } from './teams/createteam/createteam.component';
import { TeamComponent } from './teams/team/team.component';
import { InvullenComponent } from './teams/team/invullen/invullen.component';
import { ResultatenComponent } from './teams/team/resultaten/resultaten.component';
import { AanmakenComponent } from './teams/team/aanmaken/aanmaken.component'
import { ScorenComponent } from './teams/team/scoren/scoren.component';
import { UtilityService } from './utility.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { SettingsComponent } from './settings/settings.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule} from '@angular/material/radio';
import { MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatStepperModule} from '@angular/material/stepper';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material';
import { MatChipsModule} from '@angular/material/chips';
import { MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatExpansionModule} from '@angular/material/expansion'

import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';

@NgModule({
  declarations: [AppComponent, MenuComponent, LoginComponent, TodoComponent,
     TeamsComponent, TeamComponent, InvullenComponent, ResultatenComponent,
     RegisterComponent, AanmakenComponent, ScorenComponent, CreateTeamComponent,
     SettingsComponent],
  entryComponents: [],
  imports: [BrowserModule, ChartsModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule,
    BrowserAnimationsModule, MsalModule.forRoot({ clientID: OAuthSettings.appId, redirectUri: location.protocol+"//"+location.hostname+':'+location.port+'/', authority: "https://login.microsoftonline.com/a2586b9b-f867-4b3c-9363-5b435c5dbc45"}),
    MatButtonModule, MatCheckboxModule, MatSidenavModule, MatSidenavModule, MatToolbarModule, MatCardModule,
    MatGridListModule, MatMenuModule, MatIconModule, MatListModule, MatSliderModule,
    FormsModule,ReactiveFormsModule, MatRadioModule, MatTooltipModule, MatStepperModule,
    MatProgressSpinnerModule, MatInputModule, MatSelectModule, MatAutocompleteModule,
    MatSlideToggleModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule,
    HttpClientModule, RoundProgressModule, MatProgressBarModule, MatChipsModule, MatRippleModule,
    MatExpansionModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilityService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
