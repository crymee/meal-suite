import { Inject, Injectable } from '@angular/core';
import { EntityService } from "@services/entity.service";
import { EntityFeatureNameEnum } from "@store/entity.store";
import { Store } from "@ngrx/store";
import { TASK_STORE, TaskStore } from "@modules/task/store/task.store";
import { Task } from "@modules/task/models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends EntityService<EntityFeatureNameEnum.Task, Task> {
  constructor (
    protected override readonly store: Store,
    @Inject(TASK_STORE) protected override readonly entityStore: TaskStore
  ) {
    super(store, entityStore)
  }
}
