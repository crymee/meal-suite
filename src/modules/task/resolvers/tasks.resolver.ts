import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { BackendService, TaskBE } from "@services/backend.service";
import { tap } from "rxjs/operators";
import { TaskService } from "@modules/task/services/task.service";
import { Task } from "@modules/task/models/task.model";
import { TaskApi } from "@modules/task/api/task.api";

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<TaskBE[]> {
  constructor (
    protected readonly taskApi: TaskApi,
    protected readonly taskService: TaskService,
  ) {
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskBE[]> {
    return this.taskApi.get()
      .pipe(
        take(1),
        tap(tasks => {
          this.taskService.dispatchSetEntities(tasks.map(task => new Task(task)))
        })
      )
  }
}
