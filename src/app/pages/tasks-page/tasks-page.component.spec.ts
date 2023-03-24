import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPageComponent } from "@app/pages/tasks-page/tasks-page.component";
import { CommonModule } from "@angular/common";
import { TasksPageRoutingModule } from "@app/pages/tasks-page/tasks-page-routing.module";
import { TaskModule } from "@modules/task/task.module";
import { MatButtonModule } from "@angular/material/button";
import { BackendService, TaskBE } from "@services/backend.service";
import { TaskService } from "@modules/task/services/task.service";
import { TASK_STORE_CONFIG } from "@modules/task/store/task.store";
import { StoreModule } from "@store/store.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TaskApi } from "@modules/task/api/task.api";
import { filter, switchMap, take } from "rxjs";
import { tap } from "rxjs/operators";
import { Task } from "@modules/task/models/task.model";
import { faker } from "@faker-js/faker";

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TasksPageRoutingModule,
        TaskModule,
        MatButtonModule,
        MatSnackBarModule,
        StoreModule,
      ],
      providers: [
        TaskService,
        TaskApi,
        TASK_STORE_CONFIG
      ],
      declarations: [
        TasksPageComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test services', (done: DoneFn) => {
    const taskApi = TestBed.inject(TaskApi);
    const taskService = TestBed.inject(TaskService);
    let id: string

    taskApi.get().pipe(
      switchMap(value => {
        expect(value.length).toEqual(BackendService.taskCount)

        taskService.dispatchSetEntities(value.map(item => new Task(item)))

        return taskService.entities$.pipe(take(1))
      }),
      tap(entities => expect(entities.length).toEqual(BackendService.taskCount)),
      switchMap(entities => {
        id = entities[0].id

        return taskApi.delete(id)
      }),
      tap(result => {
        expect(result).toEqual(true)

        if (result) {
          taskService.dispatchDeleteEntityAction(id)
        }
      }),
      switchMap(() => taskApi.get().pipe(take(1))),
      tap(entities => expect(entities.length).toEqual(BackendService.taskCount - 1)),
      switchMap(() => fixture.componentInstance.tasks$.pipe(take(1))),
      tap(entities => expect(entities.length).toEqual(BackendService.taskCount - 1)),
      switchMap(() => taskService.entities$.pipe(take(1))),
      tap(entities => expect(entities.length).toEqual(BackendService.taskCount - 1)),
      filter(entities => !!entities.length),
      switchMap(entities => taskApi.update({...entities[0], title: 'Title Changed'})),
      tap((task: Task) => expect(task.title).toEqual('Title Changed')),
      tap((task: Task) => taskService.dispatchUpsertEntityAction(task)),
      switchMap((task: Task) => taskService.find$(task.id)),
      tap((task: Task) => expect(task.title).toEqual('Title Changed')),
      switchMap(() => taskApi.add({
        assigneeId: faker.datatype.uuid(),
        completed: false,
        description: faker.music.songName(),
        title: faker.music.genre()
      })),
      tap(result => {
        expect(result).toBeTruthy()
        if (result) {
          taskService.dispatchAddEntityAction(result)
        }
      }),
      switchMap(() => taskService.entities$.pipe(take(1))),
      tap(entities => expect(entities.length).toEqual(BackendService.taskCount)),
      switchMap(() => taskApi.get().pipe(take(1))),
      tap(entities => expect(entities.length).toEqual(BackendService.taskCount)),
      switchMap(() => fixture.componentInstance.tasks$.pipe(take(1))),
      tap(entities => expect(entities.length).toEqual(BackendService.taskCount)),
    ).subscribe(value => {
      done()
    })
  })
});
