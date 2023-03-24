import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap, throwError } from "rxjs";
import { delay } from "rxjs/operators";
import { faker } from "@faker-js/faker";
import { User } from "@modules/user/models/user.model";
import { Task } from "@modules/task/models/task.model";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

export type UserBE = {
  id: string;
  name: string;
  avatarUrl?: string
  pendingTasks?: TaskBE[]
};

export type TaskBE = {
  id: string;

  title: string;
  description: string;
  assigneeId: string;
  completed: boolean;
};

function randomDelay () {
  return 500;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  static taskCount = 5
  static userCount = 5

  fakeUser (): User {
    return new User({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      avatarUrl: faker.image.avatar()
    })
  }

  fakeTask (): Task {
    const user = this.fakeUser()

    const assignee: User | null = faker.helpers.arrayElement([user, null])

    return new Task({
      id: faker.datatype.uuid(),
      title: faker.company.bsNoun(),
      description: faker.commerce.productDescription(),
      assigneeId: assignee ? assignee.id : null,
      completed: faker.datatype.boolean(),
    })
  }

  constructor () {
    for (let i = 1; i <= BackendService.userCount; i++) {
      this.storedUsers.push(this.fakeUser())
    }

    for (let i = 1; i <= BackendService.taskCount; i++) {
      this.storedTasks.push(this.fakeTask())
    }
  }

  storedTasks: TaskBE[] = [];

  storedUsers: UserBE[] = [];

  private findTaskById = (id: string) => this.storedTasks.find(task => task.id === id);

  private findUserById = (id: string) => this.storedUsers.find(user => user.id === id);

  tasks () {
    return of(this.storedTasks).pipe(delay(randomDelay()));
  }

  task (id: string): Observable<TaskBE> {
    return of(this.findTaskById(id)).pipe(delay(randomDelay()));
  }

  deleteTask (id: string): Observable<boolean> {
    return this.fakeDelay(this.findTaskById(id)).pipe(
      switchMap(task => {
        const index = this.storedTasks.findIndex(item => item === task)

        if (index > -1) {
          this.storedTasks.splice(index, 1)

          return of(true)
        }

        return throwError(() => new Error('Delete failed!'))
      })
    );
  }

  users () {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user (id: string) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTask (payload: Omit<TaskBE, 'id'>) {
    try {
      const newTask: TaskBE = {
        id: faker.datatype.uuid(),
        title: payload.title,
        description: payload.description,
        assigneeId: payload.assigneeId,
        completed: false
      };

      this.storedTasks = this.storedTasks.concat(newTask);

      return of(newTask).pipe(delay(randomDelay()));
    } catch (e) {
      return throwError(() => new Error('Add failed!'))
    }
  }

  assign (taskId: string, userId: string) {
    return this.update(taskId, {assigneeId: userId});
  }

  complete (taskId: string, completed: boolean) {
    return this.update(taskId, {completed});
  }

  update (taskId: string, updates: Partial<Omit<TaskBE, "id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = {...foundTask, ...updates};

    this.storedTasks = this.storedTasks.map(t =>
      t.id === taskId ? updatedTask : t
    );

    return of(updatedTask).pipe(delay(randomDelay()));
  }

  fakeDelay<T> (data: T): Observable<T> {
    return of(data).pipe(delay(randomDelay()))
  }
}
