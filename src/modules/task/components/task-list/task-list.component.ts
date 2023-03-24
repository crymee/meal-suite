import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from "@modules/task/models/task.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() onDelete: EventEmitter<Task> = new EventEmitter<Task>()
  @Output() onUpdate: EventEmitter<Task> = new EventEmitter<Task>()

  delete (item: Task) {
    this.onDelete.emit(item)
  }

  update (item: Task) {
    this.onUpdate.emit(item)
  }
}
