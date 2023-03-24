import { Model } from "@common/model";
import { TaskBE } from "@services/backend.service";
import { EntityType, EntityExtra } from "@store/entity.store";

export class Task extends Model implements TaskBE, EntityType {
  $extra: EntityExtra = {}
  assigneeId: string;
  completed: boolean;
  description: string;
  title: string;

  constructor (state: TaskBE) {
    super(state);
  }

  getModel (): string {
    return Task.name;
  }
}
