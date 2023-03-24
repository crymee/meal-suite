import { Component } from '@angular/core';
import { TaskService } from "@modules/task/services/task.service";
import { catchError, combineLatestWith, EMPTY, filter, Observable, switchMap, take } from "rxjs";
import { Task } from "@modules/task/models/task.model";
import { TaskApi } from "@modules/task/api/task.api";
import { tap } from "rxjs/operators";
import { SnackBarService } from "@services/snack-bar.service";
import { MatDialog } from "@angular/material/dialog";
import {
  TaskForm,
  TaskFormComponent,
  TaskFormDialogData
} from "@modules/task/components/task-form/task-form.component";
import { UserService } from "@modules/user/services/user.service";

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  providers: [TaskApi],
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  get tasks$ (): Observable<Task[]> {
    return this.taskService.entities$
  }

  constructor (
    protected readonly dialog: MatDialog,
    protected readonly taskService: TaskService,
    protected readonly userService: UserService,
    protected readonly taskApi: TaskApi,
    protected readonly snackBarService: SnackBarService
  ) {
  }

  onDelete ($event: Task) {
    const item = Object.assign({}, $event, {$extra: {isLoading: true}})

    this.taskService.dispatchUpsertEntityAction(item)

    this.taskApi.delete($event.id)
      .pipe(
        take(1),
        tap(result => {
          if (result) {
            this.taskService.dispatchDeleteEntityAction($event.id)

            this.snackBarService.info('Delete success!')
          }
        }),
        catchError(e => {
          this.snackBarService.warn('Delete failed!')

          console.error(e)

          return EMPTY
        })
      ).subscribe()
  }

  onAdd (): void {
    const ref = this.dialog.open(TaskFormComponent, {
      minWidth: TaskFormComponent.width,
      data: {
        users$: this.userService.entities$
      } as TaskFormDialogData
    })

    ref.afterClosed()
      .pipe(
        take(1),
        filter((data: TaskForm['value']) => !!data),
        switchMap(data => this.add(data)),
      ).subscribe()
  }

  onUpdate (task: Task): void {
    const item = Object.assign({}, task, {$extra: {isLoading: true}})

    this.taskService.dispatchUpsertEntityAction(item)

    const ref = this.dialog.open(TaskFormComponent, {
      minWidth: TaskFormComponent.width,
      data: {
        users$: this.userService.entities$,
        task
      } as TaskFormDialogData
    })

    ref.afterClosed()
      .pipe(
        take(1),
        filter((data: TaskForm['value']) => !!data),
        switchMap(data => this.update(data)),
      ).subscribe()
  }

  add (data: TaskForm['value']) {
    const {assigneeId, completed, title, description} = data

    return this.taskApi.add({
      title,
      completed,
      description,
      assigneeId
    }).pipe(
      tap(data => {
        if (data) {
          this.taskService.dispatchAddEntityAction(data)

          this.snackBarService.info('Add success!')

          return
        }

        this.snackBarService.warn('Add failed!')
      }),
      catchError(e => {
        this.snackBarService.warn('Add failed!')

        console.error(e)

        return EMPTY
      })
    )
  }

  update (data: TaskForm['value']) {
    return this.taskApi.update(data).pipe(
      tap(data => {
        if (data) {
          this.taskService.dispatchUpsertEntityAction(data)

          this.snackBarService.info('Update success!')

          return
        }

        this.snackBarService.warn('Update failed!')
      }),
      catchError(e => {
        this.snackBarService.warn('Update failed!')

        console.error(e)

        return EMPTY
      })
    )
  }
}
