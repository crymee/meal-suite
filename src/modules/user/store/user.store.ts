import {
  EntityEntry,
  EntityFeatureName,
  EntityFeatureNameEnum,
  EntityStore,
  EntityStoreEnum,
  SelectState
} from "@store/entity.store";
import { UserBE } from "@services/backend.service";
import { InjectionToken, Provider } from "@angular/core";
import { User } from "@modules/user/models/user.model";

export class UserStore extends EntityStore<EntityFeatureNameEnum.User, User> {
  get selectState (): SelectState<User> {
    return this.feature.selectUserFeatureState;
  }

  getEntry (): EntityEntry<EntityFeatureNameEnum.User> {
    return 'USER';
  }

  getFeatureName (): EntityFeatureName<EntityFeatureNameEnum.User> {
    return 'userFeature';
  }
}

export const userStore = new UserStore()

export const USER_STORE = new InjectionToken<EntityStoreEnum>(EntityStoreEnum.UserStore)
export const USER_STORE_CONFIG: Provider = {
  provide: USER_STORE,
  useValue: userStore,
}
