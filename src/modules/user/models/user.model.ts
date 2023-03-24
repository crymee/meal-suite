import { Model } from "@common/model";
import { UserBE } from "@services/backend.service";
import { EntityType } from "@store/entity.store";

export class User extends Model implements UserBE, EntityType {

  name: string;
  avatarUrl?: string
  $extra: { isLoading?: boolean; isLoaded?: boolean } = {};

  constructor (state: UserBE) {
    super(state);
  }

  getModel (): string {
    return User.name;
  }
}
