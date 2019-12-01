import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {


  constructor(private authService: AuthService) {}

  signOut(): void {
    this.authService.signOut();
    console.log("auth",this.authService.authenticated);
  }
}
