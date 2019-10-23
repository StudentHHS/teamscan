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
    private breakpointObserver: BreakpointObserver,
    private us: UtilityService) {}

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
        return [
          { title: 'Invullen', text: 'Invullen van de test', cols: matches ? 2 : 1, rows: 1 },
          { title: 'Resultaten', text: 'Hier verschijnen later resultaten', cols: matches ? 2 : 2, rows: 1 },
          { title: 'Jouw vorderingen', text: 'Misschien deze card weglaten', cols: matches ? 2 : 2, rows: 1 }
        ];
      }
    )
  );

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.us.changeTitle(this.id);
 }
}
