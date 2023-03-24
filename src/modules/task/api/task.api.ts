import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BackendService, TaskBE } from "@services/backend.service";
import { Task } from "@modules/task/models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskApi {
  constructor (
    protected readonly backendService: BackendService
  ) {
  }

  delete (id: string): Observable<boolean> {
    return this.backendService.deleteTask(id)
  }

  add (payload: Omit<TaskBE, 'id'>): Observable<Task> {
    return this.backendService.newTask(payload)
      .pipe(map(task => task ? new Task(task) : null))
  }

  update (payload: Partial<TaskBE>): Observable<Task> {
    return this.backendService.update(payload.id, payload)
      .pipe(map(task => task ? new Task(task) : null))
  }

  get () {
    return this.backendService.tasks()
  }
}
