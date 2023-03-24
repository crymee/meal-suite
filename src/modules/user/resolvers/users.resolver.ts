import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { BackendService, UserBE } from "@services/backend.service";
import { tap } from "rxjs/operators";
import { UserService } from "@modules/user/services/user.service";
import { User } from "@modules/user/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<UserBE[]> {

  constructor (
    protected readonly backendService: BackendService,
    protected readonly userService: UserService
  ) {
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserBE[]> {
    return this.backendService
      .users()
      .pipe(
        take(1),
        tap(users => {
          this.userService.dispatchSetEntities(users.map(user => new User(user)))
        })
      )
  }
}
