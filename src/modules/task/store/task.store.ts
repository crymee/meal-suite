import {
  EntityEntry,
  EntityFeatureName,
  EntityFeatureNameEnum,
  EntityStore,
  EntityStoreEnum,
  SelectState
} from "@store/entity.store";
import { InjectionToken, Provider } from "@angular/core";
import { Task } from "@modules/task/models/task.model";

export class TaskStore extends EntityStore<EntityFeatureNameEnum.Task, Task> {
  get selectState (): SelectState<Task> {
    return this.feature.selectTaskFeatureState;
  }

  getEntry (): EntityEntry<EntityFeatureNameEnum.Task> {
    return 'TASK';
  }

  getFeatureName (): EntityFeatureName<EntityFeatureNameEnum.Task> {
    return 'taskFeature';
  }
}

export const taskStore = new TaskStore()

export const TASK_STORE = new InjectionToken<EntityStoreEnum>(EntityStoreEnum.TaskStore)
export const TASK_STORE_CONFIG: Provider = {
  provide: TASK_STORE,
  useValue: taskStore,
}
