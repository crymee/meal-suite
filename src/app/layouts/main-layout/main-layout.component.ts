import { Component, Inject, OnInit } from '@angular/core';
import { APP_ROUTES, AppRoute, AppRoutes } from "@config/app-routes.config";
import { BehaviorSubject } from "rxjs";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

export type SideBarItem = {
  name: string,
  icon: string
  url: AppRoute
}

@UntilDestroy()
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  sidebarItems: SideBarItem[] = [
    {
      name: 'Users',
      icon: 'supervisor_account',
      url: this.appRoutes.users
    },
    {
      name: 'Tasks',
      icon: 'tasks',
      url: this.appRoutes.tasks
    },
  ];
  opened: boolean = true;

  get loading$ () {
    return this._loading$.asObservable()
  }

  protected readonly _loading$ = new BehaviorSubject(false)

  constructor (
    protected readonly router: Router,
    @Inject(APP_ROUTES) protected readonly appRoutes: AppRoutes
  ) {
  }

  ngOnInit (): void {
    this.router
      .events
      .pipe(untilDestroyed(this))
      .subscribe(event => {
        switch (true) {
          case event instanceof NavigationStart: {
            this._loading$.next(true);
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this._loading$.next(false);
            break;
          }
          default: {
            break;
          }
        }
      });
  }
}
