import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class UtilityService{
  pageTitle: string;
  hasPrevious: boolean;
  private suffix: string;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,private titleService: Title
    ) { 
        this.pageTitle = "Teamscan"; 
        this.suffix = " - Teamscan"
        this.ngOnInit();
    }

    changeTitle(newTitle: string) {
        this.titleService.setTitle(newTitle + this.suffix);
        this.pageTitle = newTitle;
    }

    ngOnInit() {
        this.router
        .events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => {
            const child = this.activatedRoute.firstChild;
            if (child.snapshot.routeConfig['path'] && child.snapshot.routeConfig['path'] !== "login") {
                this.hasPrevious = true;
            } else {
                this.hasPrevious = false;
            }
            if (child.snapshot.data['title']) {
                if (child.snapshot.data['title'] == "Team") {
                    return null;
                }
              return child.snapshot.data['title'];
            }
            return this.pageTitle;
          })
        ).subscribe((ttl: string) => {
            if(ttl !== null) {
                this.titleService.setTitle(ttl + this.suffix);
                this.pageTitle = ttl;
                console.log("change title");
            }
        });
      }
}