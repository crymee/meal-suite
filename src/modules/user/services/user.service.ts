import { Inject, Injectable } from '@angular/core';
import { EntityService } from "@services/entity.service";
import { EntityFeatureNameEnum } from "@store/entity.store";
import { Store } from "@ngrx/store";
import { USER_STORE, UserStore } from "@modules/user/store/user.store";
import { User } from "@modules/user/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService<EntityFeatureNameEnum.User, User> {
  constructor (
    protected override readonly store: Store,
    @Inject(USER_STORE) protected override readonly entityStore: UserStore
  ) {
    super(store, entityStore)
  }
}
