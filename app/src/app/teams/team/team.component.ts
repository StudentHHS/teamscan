import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./../teams.component.css']
})

export class TeamComponent {
public id: string;
  constructor(
    private route: ActivatedRoute,
    private us: UtilityService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.us.changeTitle(this.id);
 }
}
