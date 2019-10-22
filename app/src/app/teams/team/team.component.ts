import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./../teams.component.css']
})

export class TeamComponent {
public id: string;
  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver) {}

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
        return [
          { title: 'Invullen', cols: matches ? 2 : 1, rows: 1 },
          { title: 'Resultaten', cols: 1, rows: 1 },
          { title: 'Card 3', cols: matches ? 1 : 2, rows: 1 }
        ];
      }
    )
  );

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
 }
}
